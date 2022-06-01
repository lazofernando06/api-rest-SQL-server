const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME1,
    server: 'localhost',
    /*
    "server"   : "Servername",
    "database" : "DBName",
    "user"     : "Username",
    "password" : "Passwort",
    "requestTimeout": "80000"


      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      */
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
        // trustedconnection:false,
        enableArithAbort: true,
        //encrypt:false
    }

}

const dbConnection = async () => {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbConnection
}