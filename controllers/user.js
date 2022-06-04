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
    const newUser = await user.postInsertUser();
    res.json({
        msg: "post API",
        newUser
    });
}
const userPut = async (req = request, res = response) => {
    const { id, email } = req.query;
    const { idUser, emailUser, ...query } = req.body;

    let user = new User(query);
    user.idUser = Number(id);
    user.emailUser = email;
    let [register] = await user.searchItem();
    if (id === undefined) {
        user.idUser = register.idUser;
    }
    if (email === undefined) {
        user.emailUser = register.emailUser;
    }

    let result = 'contraseña invalida';

    if (register.passwordUser === user.passwordUser) {
        result = await user.putUpDataUser();
    }

    res.json({
        msg: "put API - controlador",
        result
    });
}
const userPatchPassword = async (req, res = response) => {
    const { id, email } = req.query;
    const { passwordUser } = req.body;

    let user = new User(passwordUser);
    user.idUser = Number(id);
    user.emailUser = email;
    user.passwordUser = passwordUser;
    let [register] = await user.searchItem();
    if (id === undefined) {
        user.idUser = register.idUser;
    }
    if (email === undefined) {
        user.emailUser = register.emailUser;
    }

    let result = 'No se pudo cambiar la contraseña';

    if (register.passwordUser != user.passwordUser) {
        result = await user.patchUpPasswordUser();

    }

    res.json({
        msg: "patch API - controlador",
        result
    });
}
const userDelete = async(req, res = response) => {

    res.json({
        msg: "delete API - controlador",
       // result
    });
}

module.exports = {
    userGet,
    userGet_x_id,
    userPost,
    userPut,
    userPatchPassword,
    userDelete
}