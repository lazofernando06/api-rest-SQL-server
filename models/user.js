const { dbConnection } = require('../dababase/config');


const sql = require('mssql');

class User {
    constructor(idUser = 0, 
                nameUser = '',
                lastnameUser = '',
                emailUser = '',
                passwordUser = '',
                imgUser = '',
                idRole = 3,
                idStatus = 1,
                idGoogle = 2
                ) {
        this.idUser = idUser * 1;
        this.nameUser = nameUser;
        this.lastnameUser = lastnameUser;
        this.emailUser = emailUser;
        this.passwordUser = passwordUser;
        this.imgUser = imgUser;
        this.idRole = idRole;
        this.idStatus = idStatus;
        this.idGoogle = idGoogle;
    }
    async getUserList() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .query('GET_SP_SELECT_UserRecord')
        pool.close.bind(pool);
        return result.recordset;
    }
    async getUserItem() {
        if (this.idUser != 0 && this.emailUser == '') {
            const pool = (await dbConnection());
            const result = await pool
                .request()
                .query(`GET_SP_SELECT_User ${this.idUser}`)
            pool.close.bind(pool);
            return result.recordset;
        }
        if (this.idUser == 0 && this.emailUser != '') {
            const pool = (await dbConnection());
            const result = await pool
                .request()
                .input('input_parameter', sql.VarChar(100), this.emailUser)
                .query('GET_SP_SELECT_Email @input_parameter')
            pool.close.bind(pool);
            console.log(result.recordset);
            console.log(result.recordset);
            return result.recordset;

        }
        return [{"result": 0}];
    }
    async postInsertUser() {
        if (this.nameUser !='' && this.lastnameUser !='' && this.emailUser !='') {
            const pool = (await dbConnection());
            const result = await pool
                .request()
                .input('nameUser', sql.VarChar(100), this.nameUser)
                .input('lastnameUser', sql.VarChar(100), this.lastnameUser)
                .input('emailUser', sql.VarChar(100), this.emailUser)
                .input('passwordUser', sql.VarChar(100), this.passwordUser)
                .input('imgUser', sql.VarChar(100), this.imgUser)
                .input('idRole', sql.VarChar(100), this.idRole)
                .input('idStatus', sql.VarChar(100), this.idStatus)
                .input('idGoogle', sql.VarChar(100), this.idGoogle)
                .query('GET_SP_SELECT_Email @nameUser,@lastnameUser,@emailUser,@passwordUser,@imgUser,@idRole,@idStatus,@idGoogle')
            pool.close.bind(pool);
            return result.recordset;
        }

        return [{"result": 0}];
    }
}

module.exports = {
    User
};
