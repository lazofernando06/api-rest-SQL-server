const { response } = require("express");
const User = require("../models/user");


const isAdminRole = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }
    const { role, email } = req.user
    if (role != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${email} no es administrador`
        });
    }
    next();
}

const isRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `el servicio requiere uno de estos roles: ${roles}`
            });
        }
        next();
    }
}
const alsoUser = async (req, res = response, next) => {

    let user = new User();
    user.idUser = req.query.id === undefined ? undefined : Number(req.query.id);
    user.emailUser = req.query.email === undefined ? undefined : Number(req.query.email);
    let [register] = await user.searchItem();
    if (register == null) {
        return res.status(500).json({
            msg: 'El usuario / email no se encuentra en la db'
        });
    }

    if (user.idUser == undefined && user.emailUser == undefined) {
        return res.status(500).json({
            msg: 'Se requiere ingresar un usuario / email  valido'
        });
    }

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }
    console.log(req.user.role, 'role');
    if (req.user.role === 'USER_ROLE') {

        console.log(register.id, 'register id');
        console.log(req.user.id, 'login id');
        console.log(register.password, 'register password');
        console.log(req.user.password, 'login password');
        console.log(req.body.password, 'login password');
        if (req.user.id != register.id) {
            return res.status(401).json({
                msg: 'Solo puedes actualizar tus datos personales'
            });
        }

        if (req.user.password != req.body.password) {
            return res.status(401).json({
                msg: 'La contraseña no es valida'
            });
        }
    }
    /*
    if (req.user.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'El usuario / email ingresado no es administrador'
        });
    }
*/
    next();
}
module.exports = {
    isRole,
    isAdminRole,
    alsoUser
}