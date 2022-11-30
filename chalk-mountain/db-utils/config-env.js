require('dotenv').config()

const config = {
    user: process.env.APP_USER,
    password: process.env.APP_PASSWORD, 
    server: process.env.APP_SERVER,
    database: process.env.APP_DATABASE,
    options: {
        trustServerCertificate: true, 
        trustedConnection: false, 
        enableArithAbort: true,
        instanceName: process.env.APP_INSTANCE_NAME
    },
    port: 1433
}

module.exports = config;