const { request, response } = require('express');
const User = require('../models/user');

const userGet = async (req = request, res = response) => {
    const user = new User();
    const result = await user.getTotalUserRecord();
    const total = Object.keys(result).length
    res.json({
        msg: "get API - totales",
        total,
        result
    });
}
const userGet_x_id = async (req = request, res = response) => {
    const { id, email } = req.query;
    let user = new User();
    user.idUser = Number(id);
    user.emailUser = email;
    const result = await user.searchItem();
    res.json({
        msg: "get API - x item",
        result,
    });
}
const userPost = async (req = request, res = response) => {
    const query = req.body;
    let user = new User(query);
    user.img = user.img === undefined ? '' : user.img;
    const newUser = await user.postInsertUser();
    res.json({
        msg: "post API",
        newUser
    });
}
const userPut = async (req = request, res = response) => {
    const { id, email, ...query } = req.body;
    let user = new User(query);
    user.idUser = req.query.id === undefined ? undefined : Number(req.query.id);
    user.emailUser = req.query.email;

    let [register] = await user.searchItem();

    if (req.query.id == undefined && req.query.email == undefined) {
        return res.status(500).json({
            msg: 'Ingrese un usuario / emailvalido'
        });
    }
    if (req.query.id === undefined) {
        user.idUser = register.id;
    }
    if (req.query.email === undefined) {
        user.emailUser = register.email;
    }

    let result = await user.putUpDataUser();

    res.json({
        msg: "put API - controlador",
        result
    });
}
const userPatchPassword = async (req, res = response) => {
    const { id, email } = req.query;
    const { password } = req.body;

    let user = new User();
    user.idUser = req.query.id === undefined ? undefined : Number(req.query.id);
    user.emailUser = email;
    user.passwordUser = password;
    let [register] = await user.searchItem();
    if (id === undefined) {
        user.idUser = register.id;
    }
    if (email === undefined) {
        user.emailUser = register.email;
    }

    let result = 'No se pudo cambiar la contraseña';

    if (register.password != user.passwordUser) {
        result = await user.patchUpPasswordUser();
    }

    res.json({
        msg: "patch API - controlador",
        result
    });
}
const userDelete = async (req, res = response) => {
    let result = 'usuario no existe en la base';
    let user = new User();
    user.idUser = req.query.id === undefined ? undefined : Number(req.query.id);
    user.emailUser = req.query.email;
    let register = await user.searchItem();
    if (register != null) {
        if (req.query.id === undefined) {
            user.idUser = register.id;
        }
        if (user.idUser) {
            result = await user.deleteUserRecord();
        }
    }
    //integridad referencial

    res.json({
        msg: "delete API - controlador",
        result
    });
}
const userGetOthers = (req, res = response) => {
    res.sendFile(__dirname + 'public/404.html');
}

module.exports = {
    userGet,
    userGet_x_id,
    userPost,
    userPut,
    userPatchPassword,
    userDelete,
    userGetOthers
}