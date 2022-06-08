const cors = require('cors')
const express = require('express');
class Server {

    constructor() {
        this._app = express();
        this._port = process.env.PORT;
        this._path={
            auth:"/api/auth",
            category:"/api/category",
            user:"/api/user",
        }
        //    this.openConnection();
        //  this.closeConnection();

        this.middlerware();

        this.routes();
    }

    get app(){
        return this._newApp;
    }
    get port(){
        return this._newPort;
    }
    get authPath(){
        return this._path.auth;
    }
    get categoryRouterPath(){
        return this._path.category;
    }
    get userRouterPath(){
        return this._path.user;
    }

    set app(newApp) {
        this._app = newApp;
    }
    set port(newPort) {
        this._port = newPort;
    }
    set authPath(newAuthPath) {
        this._path.auth = newAuthPath;
    }
    set categoryRouterPath(newCategoryRouterPath) {
        this._path.category = newCategoryRouterPath;
    }
    set userRouterPath(newUserRouterPath) {
        this._path.user = newUserRouterPath;
    }
    middlerware() {
        //cors
        this._app.use(cors());
        //Json
        this._app.use(express.json());
        //public directory
        this._app.use(express.static('public'));
    }
    routes() {
        this._app.use(this._path.auth, require('../routes/auth'));
        this._app.use(this._path.category, require('../routes/category'));
        this._app.use(this._path.user, require('../routes/user'));
    }
    listen() {
        this._app.listen(this._port, () => {
            console.log("El servidor esra corriendo en el puerto", this._port);
        });
    }
}
module.exports = Server;
