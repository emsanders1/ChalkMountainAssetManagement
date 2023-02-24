const { user } = require('./config-env');
const config = require('./config-env'),
      sql    = require('mssql');

const viewAssets = async(sortColumn, sortOrder, pageSize, pageNumber, statusBit) => {
    try {
        const pool = await sql.connect(config);
        const assets = await pool.request()
            .input('SortColumn', sql.VarChar, sortColumn)
            .input('SortOrder', sql.VarChar, sortOrder)
            .input('PageSize', sql.Int, pageSize)
            .input('PageNumber', sql.Int, pageNumber)
            .input('StatusBit', sql.Bit, statusBit)
            .execute('dbProcViewAssets');

        return assets;
    }
    catch(error) {
        console.log(error);
    }
}

const viewTractors = async(sortColumn, sortOrder, pageSize, pageNumber) => {
    try {
        const pool = await sql.connect(config);
        const assets = await pool.request()
            .input('SortColumn', sql.VarChar, sortColumn)
            .input('SortOrder', sql.VarChar, sortOrder)
            .input('PageSize', sql.Int, pageSize)
            .input('PageNumber', sql.Int, pageNumber)
            .input('StatusBit', sql.Bit, statusBit)
            .execute('dbProcViewTractors');

        return assets;
    }
    catch(error) {
        console.log(error);
    }
}

const viewTrailers = async(sortColumn, sortOrder, pageSize, pageNumber) => {
    try {
        const pool = await sql.connect(config);
        const assets = await pool.request()
            .input('SortColumn', sql.VarChar, sortColumn)
            .input('SortOrder', sql.VarChar, sortOrder)
            .input('PageSize', sql.Int, pageSize)
            .input('PageNumber', sql.Int, pageNumber)
            .input('StatusBit', sql.Bit, statusBit)
            .execute('dbProcViewTrailers');

        return assets;
    }
    catch(error) {
        console.log(error);
    }
}

const sendInService = async(USER, UNITNUMBER) => {
    try {
        logRequest(USER, UNITNUMBER, true);
    }
    catch(error) {
        console.log(error)
    }
}

const sendOutOfService = async(USER, UNITNUMBER, NOTES) => {
    try {
        logRequest(USER, UNITNUMBER, false);

        const pool = await sql.connect(config);
        const result = await pool.request()
            .input("unitNumber", sql.NVarChar, UNITNUMBER)
            .input("notes", sql.NVarChar(sql.MAX), NOTES)
            .query("INSERT INTO Note (NOTE_ID, UNITNUMBER, NOTES) VALUES (NEWID(), @unitNumber, @notes)");
    
        } catch(error) {
        console.log(error)
    }
}

const logRequest = async (USER, UNITNUMBER, newStatus) => {
    try {        
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('USER', sql.NVarChar, USER)
            .input('UNITNUMBER', sql.NVarChar, UNITNUMBER)
            .input('STATUS', sql.Bit, newStatus)
            .query('INSERT INTO Request (REQUEST_ID, [USER], UNITNUMBER, STATUS) VALUES (NEWID(), @USER, @UNITNUMBER, @STATUS)');

    } catch (error) {
      console.error(error);
    }
  };

  const getAssetStatus = async(UNITNUMBER) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request()
            .input('UNITNUMBER', sql.VarChar, UNITNUMBER);
        
        const result = await request.execute('procGetAssetStatus');
        return result;
    } catch(error) {
        console.log(error);
    }
};


module.exports= {
    viewAssets,
    viewTractors,
    viewTrailers,
    sendInService,
    sendOutOfService,
    getAssetStatus
}