const { dbConnection } = require('../dababase/config');
const sql = require('mssql');

class Role {

    constructor(
        objRole = {
            idRole,
            typeRole
        }) {
        this._idRole = objRole.idRole * 1;
        this._typeRole = objRole.typeRole;
    }

    get idRole() {
        return this._idRole;
    }
    get typeRole() {
        return this._typeRole;
    }
    set idRole(newIdRole) {
        this._idRole = newIdRole;
    }
    set typeRole(newTypeRole) {
        this._typeRole = newTypeRole;
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
