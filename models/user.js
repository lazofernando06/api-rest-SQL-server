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
            roleUser: '',
            statusUser: '',
            googleUser: '',
        }) {
        this._idUser = objUser.idUser;
        this._nameUser = objUser.nameUser;
        this._lastnameUser = objUser.lastnameUser;
        this._emailUser = objUser.emailUser;
        this._passwordUser = objUser.passwordUser;
        this._imgUser = objUser.imgUser;
        this._roleUser = objUser.roleUser;
        this._statusUser = objUser.statusUser;
        this._googleUser = objUser.googleUser;
    }

    get idUser() {
        return this._idUser;
    }
    get nameUser() {
        return this._nameUser;
    }
    get lastnameUser() {
        return this._lastnameUser;
    }
    get emailUser() {
        return this._emailUser;
    }
    get passwordUser() {
        return this._passwordUser;
    }
    get imgUser() {
        return this._imgUser;
    }
    get roleUser() {
        return this._roleUser;
    }
    get statusUser() {
        return this._statusUser;
    }
    get googleUser() {
        return this._googleUser;
    }

    set idUser(newIdUser) {
        this._idUser = newIdUser;
    }
    set nameUser(newNameUser) {
        this._nameUser = newNameUser;
    }
    set lastnameUser(newLastnameUser) {
        this._lastnameUser = newLastnameUser;
    }
    set emailUser(newEmailUser) {
        this._emailUser = newEmailUser;
    }
    set passwordUser(newPasswordUser) {
        this._passwordUser = newPasswordUser;
    }
    set imgUser(newImgUser) {
        this._imgUser = newImgUser;
    }
    set roleUser(newRoleUser) {
        this._roleUser = newRoleUser;
    }
    set statusUser(newStatusUser) {
        this._statusUser = newStatusUser;
    }
    set googleUser(newGoogleUser) {
        this._googleUser = newGoogleUser;
    }

    async getTotalUserRecord() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .query('GET_SP_SELECT_UserRecord')
        pool.close.bind(pool);
        return result.recordset;
    }
    async getRecordById() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('idUser', sql.Int, this._idUser)
            .query('GET_SP_SELECT_User @idUser')
        pool.close.bind(pool);
        return result.recordset;
    }
    async getRecordByEmail() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('emailUser', sql.VarChar(100), this._emailUser)
            .query('GET_SP_SELECT_Email @emailUser')
        pool.close.bind(pool);
        return result.recordset;
    }

    async searchItem() {
        if (this._idUser) {
            return this.getRecordById();
        }
        if (this._emailUser) {
            return this.getRecordByEmail();
        }
    }

    async postInsertUser() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('nameUser', sql.VarChar(50), this._nameUser)
            .input('lastnameUser', sql.VarChar(50), this._lastnameUser)
            .input('emailUser', sql.VarChar(50), this._emailUser)
            .input('password', sql.VarChar(50), this._passwordUser)
            .input('imgUser', sql.VarChar(100), this._imgUser)
            .input('roleUser', sql.VarChar(100), this._roleUser)
            .input('statusUser', sql.VarChar(100), this._statusUser)
            .input('googleUser', sql.VarChar(100), this._googleUser)
            .query('POST_SP_INSERT_User @nameUser,@lastnameUser,@emailUser,@password,@imgUser,@roleUser,@statusUser,@googleUser')
        pool.close.bind(pool);
        return result.recordset;
    }

    async putUpDataUser() {

        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('idUser', sql.Int, this._idUser)
            .input('nameUser', sql.VarChar(50), this._nameUser)
            .input('lastnameUser', sql.VarChar(50), this._lastnameUser)
            .input('passwordUser', sql.VarChar(50), this._passwordUser)
            .input('imgUser', sql.VarChar(100), this._imgUser)
            .input('roleUser', sql.VarChar(100), this._roleUser)
            .input('statusUser', sql.VarChar(100), this._statusUser)
            .input('googleUser', sql.VarChar(100), this._googleUser)
            .query('PUT_SP_UPDATA_User @idUser, @nameUser,@lastnameUser,@passwordUser,@imgUser,@roleUser,@statusUser,@googleUser')
        pool.close.bind(pool);
        return result.recordset;
    }
    async patchUpPasswordUser() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('idUser', sql.Int, this._idUser)
            .input('passwordUser', sql.VarChar(50), this._passwordUser)
            .query('PATCH_SP_UPDATA_Password @idUser,@passwordUser')
        pool.close.bind(pool);
        return result.recordset;
    }

}

module.exports = User;
