const { user } = require('./config-env');
const config = require('./config-env'),
      sql    = require('mssql');

/**
 * 
 * @returns all assets from the equipment table
 */
const viewAll = async() => {
    try {
        let pool = await sql.connect(config);
        let assets = pool.request().query("SELECT Equipment.UNITID, Equipment.STATUS, t1.MOST_RECENT_UPDATE, t1.[USER], Note.NOTES FROM Equipment LEFT JOIN (SELECT Request.[UNITID], Request.[USER], MOST_RECENT_UPDATE FROM  Request INNER JOIN (SELECT [UNITID], MAX([TIME]) AS MOST_RECENT_UPDATE FROM Request GROUP BY [UNITID]) ms on Request.UNITID = ms.UNITID and MOST_RECENT_UPDATE = [TIME]) t1 ON Equipment.UNITID = t1.UNITID LEFT JOIN Note ON Note.UNITID = Equipment.UNITID")
        console.log(assets);
        return assets;
    }
    catch(error) {
        console.log(error);
    }
}

const viewAsset = async(UNITID) => {
    try {
        let pool = await sql.connect(config);
        let assets = pool.request().query("EXECUTE procViewAsset @unitid = '" + UNITID + "'")
        console.log(assets);
        return assets;
    }
    catch(error) {
        console.log(error);
    }
}

const initializeEquipment = async() => {
    try {
        let pool = await sql.connect(config);
        pool.request().query("UPDATE dbo.Equipment SET STATUS = CASE WHEN dbo.Equipment.STATUS IS NULL THEN 1 ELSE dbo.Equipment.STATUS END")
    }
    catch(error) {
        console.log(error)
    }
}

const sendInService = async(USER, UNITID) => {
    try {
        let pool = await sql.connect(config);
        pool.request().query("UPDATE Equipment SET STATUS = 1 WHERE UNITID = " + UNITID)
        updateNotes(UNITID, null)
        logRequest(USER, UNITID, true);
    }
    catch(error) {
        console.log(error)
    }
}

const sendOutOfService = async(USER, UNITID, NOTES) => {
    try {
        let pool = await sql.connect(config);
        pool.request().query("UPDATE Equipment SET STATUS = 0 WHERE UNITID = " + UNITID);
        updateNotes(UNITID, NOTES);
        logRequest(USER, UNITID, false);
    }
    catch(error) {
        console.log(error)
    }
}

const logRequest = async(USER, UNITID, movedInService) => {
    try {
        let pool = await sql.connect(config);
        let queryString = null
        if(movedInService) 
            queryString = "INSERT INTO Request(REQUEST_ID, [USER], UNITID, MOVED_IN_SERVICE, MOVED_OUT_OF_SERVICE) VALUES (NEWID(), '" + USER + "', '" + UNITID + "', '1', '0')";
        else
            queryString = "INSERT INTO Request(REQUEST_ID, [USER], UNITID, MOVED_IN_SERVICE, MOVED_OUT_OF_SERVICE) VALUES (NEWID(), '" + USER + "', '" + UNITID + "', '0', '1')";
       
        pool.request().query(queryString);
    }
    catch(error) {
        console.log(error)
    }
}

const updateNotes = async(UNITID, NOTES) => {
    try {
        let pool = await sql.connect(config);
        let queryString = null
        if(NOTES != null) 
            queryString = "EXECUTE procUpdateInsertNotes @unitid = '" + UNITID + "', @notes = '" + NOTES + "'"
        else
            queryString = "EXECUTE procUpdateInsertNotes @unitid = '" + UNITID + "', @notes = NULL"
       
        pool.request().query(queryString);
    }
    catch(error) {
        console.log(error)
    }
}

module.exports= {
    viewAll,
    sendInService,
    sendOutOfService,
    viewAsset
}