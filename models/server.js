const cors = require('cors')
const express = require('express');
class Server {

    constructor() {
        this._app = express();
        this._port = process.env.PORT;
        this._authPath = "/api/auth";
        this._userRouterPath = "/api/user";

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
        return this._authPath;
    }
    get userRouterPath(){
        return this._userRouterPath;
    }

    set app(newApp) {
        this._app = newApp;
    }
    set port(newPort) {
        this._port = newPort;
    }
    set authPath(newAuthPath) {
        this._authPath = newAuthPath;
    }
    set userRouterPath(newUserRouterPath) {
        this._userRouterPath = newUserRouterPath;
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
        this._app.use(this._authPath, require('../routes/auth'));
        this._app.use(this._userRouterPath, require('../routes/user'));
    }
    listen() {
        this._app.listen(this._port, () => {
            console.log("El servidor esra corriendo en el puerto", this._port);
        });
    }
}
module.exports = Server;
