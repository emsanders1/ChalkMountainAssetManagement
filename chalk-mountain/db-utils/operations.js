const config = require('./config-env'),
      sql    = require('mssql');

const viewAll = async() => {
    try {
        let pool = await sql.connect(config);
        let assets = pool.request().query("SELECT * FROM dbo.Equipment")
        console.log(assets);
        return assets;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports= {
    viewAll
}