const sql = require('mssql');

const config = {

    user: 'sqlserver',
    password: 'certus123456',
    database: 'TimetoTravelApp_User',
    server: '35.224.234.43',

  /*  
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME1,
    server: 'localhost',
*/

    options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
        trustedconnection:false,
        enableArithAbort: true,
        encrypt:false
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

/**
 *  LAPTOP-LAZOFERN
 * 
 */