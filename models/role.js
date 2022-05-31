const { dbConnection } = require('../dababase/config');
class Role {

    constructor(
        objUser = {
            idRole,
            typeRole,
        }) {
        this.idRole = objUser.idRole * 1;
        this.typeRole = objUser.typeRole;
    }

    async getRoleItem() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('@typeRole', sql.VarChar(100), this.typeRole)
            .query('select * from t_Role where typeRole = @typeRole')
        pool.close.bind(pool);
        return result.recordset;
    }
}
module.exports = Role;

