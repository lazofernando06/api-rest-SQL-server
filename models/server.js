const cors = require('cors')
const express = require('express');
class Server {

    constructor() {
        this._app = express();
        this._port = process.env.PORT;
        this._userRouterPath = "/api/user";

        //    this.openConnection();
        //  this.closeConnection();

        this.middlerware();

        this.routes();
    }

    get app(){
        return this.newApp;
    }
    get port(){
        return this.newPort;
    }
    get guestRouterPath(){
        return this.newGuestRouterPath;
    }

    set app(newApp) {
        this._app = newApp;
    }
    set port(newPort) {
        this._port = newPort;
    }
    set guestRouterPath(newGuestRouterPath) {
        this._userRouterPath = newGuestRouterPath;
    }
    /*
        async openConnection() {
            await dbConnection();
            console.log('Conexión de base de datos abierta');
        }
        async closeConnection() {
            const pool = await dbConnection();
            pool.close.bind(pool);
            console.log("Conexión de base de datos cerrada");
        }
    */

    middlerware() {
        //cors
        this._app.use(cors());
        //Json
        this._app.use(express.json());
        //public directory
        this._app.use(express.static('public'));
    }
    routes() {
        this._app.use(this._userRouterPath, require('../routes/user'));
    }
    listen() {
        this._app.listen(this._port, () => {
            console.log("El servidor esra corriendo en el puerto", this._port);
        });
    }
}
module.exports = Server;
