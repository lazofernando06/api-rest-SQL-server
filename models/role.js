const { dbConnection } = require('../dababase/config');
const sql = require('mssql');

class Role {

    constructor(
        idRole,
        typeRole
        ) {
        this.idRole = idRole * 1;
        this.typeRole = typeRole;
    }

    async getRoleItem() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('@typeRole', sql.VarChar(100), this.typeRole)
            .execute('GET_SP_SELECT_role1 @typeRole')
           // .query('GET_SP_SELECT_User @idUser')
        pool.close.bind(pool);
        console.log('AQUI');
        return result.recordset;
    }
}
module.exports = Role;
