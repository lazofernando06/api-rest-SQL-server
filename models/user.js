const { dbConnection } = require('../dababase/config');


const sql = require('mssql');

class User {
    constructor(
        objUser = {
            idUser: 0,
            nameUser: '',
            lastnameUser: '',
            emailUser: '',
            passwordUser: '',
            imgUser: '',
            roleUser :'DEV_ROLE',
            statusUser: 'ACTIVE',
            googleUser: 'NO ENABLE',
        }) {
        this.idUser = objUser.idUser * 1;
        this.nameUser = objUser.nameUser;
        this.lastnameUser = objUser.lastnameUser;
        this.emailUser = objUser.emailUser;
        this.passwordUser = objUser.passwordUser;
        this.imgUser = objUser.imgUser;
        this.roleUser = objUser.roleUser;
        this.statusUser = objUser.statusUser;
        this.googleUser = objUser.googleUser;
    }

    async getUserList() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .query('GET_SP_SELECT_UserRecord')
        pool.close.bind(pool);
        return result.recordset;
    }
    async getID() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('idUser', sql.Int, this.idUser)
            .query('GET_SP_SELECT_User @idUser')
        pool.close.bind(pool);
        return result.recordset
    }
    async getEmail() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('emailUser', sql.VarChar(100), this.emailUser)
            .query('GET_SP_SELECT_Email @emailUser')
        pool.close.bind(pool);
        return result.recordset;
    }

    async getUserItem() {
        if (this.idUser != 0 && this.emailUser == '') {
            return this.getID();
        }
        if (this.idUser == 0 && this.emailUser != '') {
            return this.getEmail();
        }
    }
    async postInsertUser() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('nameUser', sql.VarChar(50), this.nameUser)
            .input('lastnameUser', sql.VarChar(50), this.lastnameUser)
            .input('emailUser', sql.VarChar(50), this.emailUser)
            .input('passwordUser', sql.VarChar(80), this.passwordUser)
            .input('imgUser', sql.VarChar(100), this.imgUser)
            .input('roleUser', sql.VarChar(100), this.roleUser)
            .input('statusUser', sql.VarChar(100), this.statusUser)
            .input('googleUser', sql.VarChar(100), this.googleUser)
            .query('POST_SP_INSERT_User @nameUser,@lastnameUser,@emailUser,@passwordUser,@imgUser,@roleUser,@statusUser,@googleUser')
        pool.close.bind(pool);
        return result.recordset;
    }
    async putUserItem() {

        if (this.idUser != 0 && this.emailUser == '') {
            return this.idUser;
        }
        if (this.idUser == 0 && this.emailUser != '') {
            const [objPrueba] = await this.getEmail();
            //const [{ lastnameUser }] = JSON.stringify(await getEmail());
            // console.log('viene de email', idUser);
            return objPrueba.idUser;
        }
    }
    async putUpDataUser() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('idUser', sql.Int, this.idUser)
            .input('nameUser', sql.VarChar(50), this.nameUser)
            .input('lastnameUser', sql.VarChar(50), this.lastnameUser)
            .input('passwordUser', sql.VarChar(80), this.passwordUser)
            .input('imgUser', sql.VarChar(100), this.imgUser)
            .input('roleUser', sql.VarChar(100), this.roleUser)
            .input('statusUser', sql.VarChar(100), this.statusUser)
            .input('googleUser', sql.VarChar(100), this.googleUser)
            .query('PUT_SP_UPDATA_User @idUser, @nameUser,@lastnameUser,@passwordUser,@imgUser,@roleUser,@statusUser,@googleUser')
        pool.close.bind(pool);
        return result.recordset;
    }
}

module.exports = User;
