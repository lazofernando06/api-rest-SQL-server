require('dotenv').config()


const Server = require("./models/server");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++


/*
const swaggerJSdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const suaggerOptions ={
    swaggerdefinition:{
        info:{
            version: '1.0.1',
            title:'API REST Time to Travel',
            description: 'API REST Time to Travel',
            contact:{
                name:'Team Avengers'
            },
            servers:[
                'http://localhost:8080',
            ]
        }
    },
    apis:['./routes/user.js']
};
const swaggerDocs=swaggerJSdoc(suaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
*/
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const server = new Server();
server.listen();
