const { dbConnection } = require('../dababase/config');
const sql = require('mssql');

class User {
    constructor(
        objUser = {
            idUser,
            nameUser,
            lastnameUser,
            emailUser,
            passwordUser,
            imgUser,
            roleUser,
            statusUser,
            googleUser,
        }) {
        this.idUser = objUser.idUser;
        this.nameUser = objUser.nameUser;
        this.lastnameUser = objUser.lastnameUser;
        this.emailUser = objUser.emailUser;
        this.passwordUser = objUser.passwordUser;
        this.imgUser = objUser.imgUser;
        this.roleUser = objUser.roleUser;
        this.statusUser = objUser.statusUser;
        this.googleUser = objUser.googleUser;
    }

    get idUser() {
        return this.idUser;
    }
    get nameUser() {
        return this.nameUser;
    }
    get lastnameUser() {
        return this.lastnameUser;
    }
    get emailUser() {
        return this.emailUser;
    }
    get passwordUser() {
        return this.passwordUser;
    }
    get imgUser() {
        return this.imgUser;
    }
    get roleUser() {
        return this.roleUser;
    }
    get statusUser() {
        return this.statusUser;
    }
    get googleUser() {
        return this.googleUser;
    }

    set idUser(newIdUser) {
        this.idUser = newIdUser;
    }
    set nameUser(newNameUser) {
        this.nameUser = newNameUser;
    }
    set lastnameUser(newLastnameUser) {
        this.lastnameUser = newLastnameUser;
    }
    set emailUser(newEmailUser) {
        this.emailUser = newEmailUser;
    }
    set passwordUser(newPasswordUser) {
        this.passwordUser = newPasswordUser;
    }
    set imgUser(newImgUser) {
        this.imgUser = newImgUser;
    }
    set roleUser(newRoleUser) {
        this.roleUser = newRoleUser;
    }
    set statusUser(newStatusUser) {
        this.statusUser = newStatusUser;
    }
    set googleUser(newGoogleUser) {
        this.googleUser = newGoogleUser;
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
        console.log('idUser', this.idUser);
        if (this.idUser != 0) {
            return this.getID();
        }
        if (this.emailUser != '') {
            return this.getEmail();
        }
    }
    showData() {
        console.log(this.idUser);
        console.log(this.nameUser);
        console.log(this.lastnameUser);
        console.log(this.emailUser);
        console.log(this.passwordUser);
        console.log(this.imgUser);
        console.log(this.roleUser);
        console.log(this.statusUser);
        console.log(this.googleUser);
    }

    async postInsertUser() {
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('nameUser', sql.VarChar(50), this.nameUser)
            .input('nameUser', sql.VarChar(50), this.nameUser)
            .input('lastnameUser', sql.VarChar(50), this.lastnameUser)
            .input('emailUser', sql.VarChar(50), this.emailUser)
            .input('imgUser', sql.VarChar(100), this.imgUser)
            .input('roleUser', sql.VarChar(100), this.roleUser)
            .input('statusUser', sql.VarChar(100), this.statusUser)
            .input('googleUser', sql.VarChar(100), this.googleUser)
            .query('POST_SP_INSERT_User @nameUser,@lastnameUser,@emailUser,@imgUser,@roleUser,@statusUser,@googleUser')
        pool.close.bind(pool);
        return result.recordset;
    }

    async putUpDataUser() {
        const [recordUser] = await this.getUserItem();
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('idUser', sql.Int, recordUser.idUser)
            .input('nameUser', sql.VarChar(50), this.nameUser)
            .input('lastnameUser', sql.VarChar(50), this.lastnameUser)
            .input('imgUser', sql.VarChar(100), this.imgUser)
            .input('roleUser', sql.VarChar(100), this.roleUser)
            .input('statusUser', sql.VarChar(100), this.statusUser)
            .input('googleUser', sql.VarChar(100), this.googleUser)
            .query('PUT_SP_UPDATA_User @idUser, @nameUser,@lastnameUser,@imgUser,@roleUser,@statusUser,@googleUser')
        pool.close.bind(pool);
        return result.recordset;
    }
    async putUpPasswordUser() {
        const [recordUser] = await this.getUserItem();
        const pool = (await dbConnection());
        const result = await pool
            .request()
            .input('idUser', sql.Int, recordUser.idUser)
            .input('password', sql.VarChar(50), this.password)
            .query('PUT_SP_UPPASSWORD_User @idUser, @password')
        pool.close.bind(pool);
        return result.recordset;
    }

}

module.exports = User;
