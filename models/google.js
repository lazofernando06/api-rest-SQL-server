const { dbConnection } = require('../dababase/config');
const sql = require('mssql');

class Google {

    constructor(
        objGoogle = {
            idGoogle,
            statusGoogle
        }) {
        this._idGoogle = objGoogle.idGoogle * 1;
        this._statusGoogle = objGoogle.statusGoogle;
    }

    get idGoogle() {
        return this._idGoogle;
    }
    get statusGoogle() {
        return this._statusGoogle;
    }
    set idGoogle(newIdGoogle) {
        this._idGoogle = newIdGoogle;
    }
    set statusGoogle(newStatusGoogle) {
        this._statusGoogle = newStatusGoogle;
    }
    async getGoogleItem() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('statusGoogle', sql.VarChar(100), this.statusGoogle)
            .query('GET_SP_SELECT_google @statusGoogle')
        pool.close.bind(pool);
        return result.recordset;
    }
}
module.exports = Google;