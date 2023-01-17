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
        let assets = pool.request().query("EXECUTE procViewAllAssets")
        console.log(assets);
        return assets;
    }
    catch(error) {
        console.log(error);
    }
}

const viewAsset = async(UNITNUMBER) => {
    try {
        let pool = await sql.connect(config);
        let assets = pool.request().query("execute procViewAsset @unitnumber = '" + UNITNUMBER + "'")
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

const sendInService = async(USER, UNITNUMBER) => {
    try {
        let pool = await sql.connect(config);
        pool.request().query("UPDATE Equipment SET STATUS = 1 WHERE UNITNUMBER = '" + UNITNUMBER + "'")
        updateNotes(UNITNUMBER, null)
        logRequest(USER, UNITNUMBER, true);
    }
    catch(error) {
        console.log(error)
    }
}

const sendOutOfService = async(USER, UNITNUMBER, NOTES) => {
    try {
        let pool = await sql.connect(config);
        pool.request().query("UPDATE Equipment SET STATUS = 0 WHERE UNITNUMBER = '" + UNITNUMBER + "'")
        updateNotes(UNITNUMBER, NOTES);
        logRequest(USER, UNITNUMBER, false);
    }
    catch(error) {
        console.log(error)
    }
}

const logRequest = async(USER, UNITNUMBER, movedInService) => {
    try {
        let pool = await sql.connect(config);
        let queryString = null
        if(movedInService) 
            queryString = "INSERT INTO Request(REQUEST_ID, [USER], UNITNUMBER, MOVED_IN_SERVICE, MOVED_OUT_OF_SERVICE) VALUES (NEWID(), '" + USER + "', '" + UNITNUMBER + "', '1', '0')";
        else
            queryString = "INSERT INTO Request(REQUEST_ID, [USER], UNITNUMBER, MOVED_IN_SERVICE, MOVED_OUT_OF_SERVICE) VALUES (NEWID(), '" + USER + "', '" + UNITNUMBER + "', '0', '1')";
       
        pool.request().query(queryString);
    }
    catch(error) {
        console.log(error)
    }
}

const updateNotes = async(UNITNUMBER, NOTES) => {
    try {
        let pool = await sql.connect(config);
        let queryString = null
        if(NOTES != null) 
            queryString = "EXECUTE procUpdateInsertNotes @unitnumber = '" + UNITNUMBER + "', @notes = '" + NOTES + "'"
        else
            queryString = "EXECUTE procUpdateInsertNotes @unitnumber = '" + UNITNUMBER + "', @notes = NULL"
       
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