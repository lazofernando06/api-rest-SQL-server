const cors = require('cors')
const express = require('express')
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.guestRouterPath="/api/guest";

        this.middlerware();

        this.routes();
    }

    middlerware() {
        //cors
        this.app.use(cors());
        //Json
        this.app.use(express.json());
        //public directory
        this.app.use(express.static('public'));
    }



    routes() {
        this.app.use(this.guestRouterPath,require('../routes/guest'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("El servidor esra corriendo en el puerto", this.port);
        });
    }
}
module.exports = Server;
