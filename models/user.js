const { dbConnection } = require('../dababase/config');
const sql = require('mssql');

class User {
    constructor(
        objUser = {
            id: 0,
            name: '',
            lastname: '',
            email: '',
            password: '',
            img: '',
            role: '',
            status: '',
            google: '',
        }) {
        this._idUser = objUser.id;
        this._nameUser = objUser.name;
        this._lastnameUser = objUser.lastname;
        this._emailUser = objUser.email;
        this._passwordUser = objUser.password;
        this._imgUser = objUser.img==undefined?'':objUser.img;
        this._roleUser = objUser.role;
        this._statusUser = objUser.status;
        this._googleUser = objUser.google;
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
        return result.recordset?result.recordset:null;
    }
    async getRecordById() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('idUser', sql.Int, this._idUser)
            .query('GET_SP_SELECT_User @idUser')
        pool.close.bind(pool);
        return result.recordset?result.recordset:null;
    }
    async getRecordByEmail() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('emailUser', sql.VarChar(100), this._emailUser)
            .query('GET_SP_SELECT_Email @emailUser')
        pool.close.bind(pool);
        return result.recordset?result.recordset:null;
    }

    async searchItem() {
        if (this._idUser) {
            return this.getRecordById();
        }
        if (this._emailUser) {
            return this.getRecordByEmail();
        }
        return null;    
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
    
    async deleteUserRecord() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('idUser', sql.Int, this._idUser)
            .query('DELETE_SP_UPDATA_RecordUser @idUser')
        pool.close.bind(pool);
        return result.recordset;
    }
}

module.exports = User;
