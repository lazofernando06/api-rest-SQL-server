const { dbConnection } = require('../dababase/config');
const sql = require('mssql');

class Status {

    constructor(
        objStatus = {
            idStatus,
            nameStatus
        }) {
        this._idRole = objStatus.idStatus * 1;
        this._nameStatus = objStatus.nameStatus;
    }

    get idStatus() {
        return this._idStatus;
    }
    get typeRole() {
        return this._nameStatus;
    }
    set idStatus(newIdStatus) {
        this._idStatus = newIdStatus;
    }
    set typeRole(newNameStatus) {
        this._nameStatus = newNameStatus;
    }


    async getStatusItem() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('nameStatus', sql.VarChar(100), this._nameStatus)
            .query('GET_SP_SELECT_status @nameStatus')
        pool.close.bind(pool);
        return result.recordset;
    }
}
module.exports = Status;