const cors = require('cors')
const express = require('express');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.guestRouterPath = "/api/user";

    //    this.openConnection();
      //  this.closeConnection();

        this.middlerware();

        this.routes();
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
        this.app.use(cors());
        //Json
        this.app.use(express.json());
        //public directory
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.guestRouterPath, require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("El servidor esra corriendo en el puerto", this.port);
        });
    }
}
module.exports = Server;
