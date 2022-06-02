const { dbConnection } = require('../dababase/config');
const sql = require('mssql');

class Role {

    constructor(
        objRole={
            idRole,
            typeRole
        }) {
        this.idRole = objRole.idRole * 1;
        this.typeRole = objRole.typeRole;
    }

    async getRoleItem() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('typeRole', sql.VarChar(100), this.typeRole)
            .query('GET_SP_SELECT_role @typeRole')
        pool.close.bind(pool);
        return result.recordset;
    }
}
module.exports = Role;
