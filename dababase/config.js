const sql = require('mssql');
const production = true;
const config = {

    user: production == true ? process.env.DB_USER : process.env.DB_USER_DEV,
    password: production == true ? process.env.DB_PWD : process.env.DB_PWD_DEV,
    database: production == true ? process.env.DB_NAME : process.env.DB_NAME_DEV,
    server: production == true ? '35.224.234.43' : 'localhost',

    options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
        //trustedconnection: false,
        //enableArithAbort: true,
        encrypt: false
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