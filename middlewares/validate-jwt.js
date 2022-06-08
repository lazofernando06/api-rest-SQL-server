const { response, request } = require("express")
const jwt = require('jsonwebtoken');
const User = require('../models/user');
let user = new User();

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        user.idUser = uid;
        let [register] = await user.getRecordById();

        req.user = register;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: 'token no valido'
        });
    }


}


module.exports = {
    validateJWT,
}