const { user } = require('./config-env');
const config = require('./config-env'),
      sql    = require('mssql');

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
        let asset = pool.request().query("EXECUTE procViewAsset @unitnumber = '" + UNITNUMBER + "'");
        return asset;
    }
    catch(error) {
        console.log(error);
    }
}

const sendInService = async(USER, UNITNUMBER) => {
    try {
        let pool = await sql.connect(config);
        logRequest(USER, UNITNUMBER, true);
    }
    catch(error) {
        console.log(error)
    }
}

const sendOutOfService = async(USER, UNITNUMBER, NOTES) => {
    try {
        let pool = await sql.connect(config);
        logRequest(USER, UNITNUMBER, false);
        pool.request().query("INSERT INTO Note(NOTE_ID, UNITNUMBER, NOTES) VALUES (NEWID(), '" + UNITNUMBER + "', '" + NOTES + "')");
    }
    catch(error) {
        console.log(error)
    }
}

const logRequest = async(USER, UNITNUMBER, newStatus) => {
    try {
        let pool = await sql.connect(config);
        let newStatusBit = newStatus ? '1' : '0';
        pool.request().query("INSERT INTO Request(REQUEST_ID, [USER], UNITNUMBER, STATUS) VALUES (NEWID(), '" + USER + "', '" + UNITNUMBER + "', " + newStatusBit + ")");
    }
    catch(error) {
        console.log(error)
    }
}

const getAssetStatus = async(UNITNUMBER) => {
    try {
        let pool = await sql.connect(config)
        let status = pool.request().query("EXECUTE procGetAssetStatus @unitnumber = '" + UNITNUMBER + "'")
        return status;
    }
    catch(error) {
        console.log(error)
    }
}

module.exports= {
    viewAll,
    sendInService,
    sendOutOfService,
    viewAsset,
    getAssetStatus
}