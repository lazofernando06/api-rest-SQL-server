const { dbConnection } = require('../dababase/config');
const sql = require('mssql');

class Status {

    constructor(
        objStatus={
            idStatus,
            nameStatus
        }) {
        this.idStatus = objStatus.idStatus * 1;
        this.nameStatus = objStatus.nameStatus;
    }

    async getStatusItem() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('nameStatus', sql.VarChar(100), this.nameStatus)
            .query('GET_SP_SELECT_Status @nameStatus')
        pool.close.bind(pool);
        return result.recordset;
    }
}
module.exports = Status;
