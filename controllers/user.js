const { request, response } = require('express');
const Role = require('../models/role');
const User = require('../models/user');

const userGet = async (req = request, res = response) => {
    const user = new User();
    const result = await user.getUserList();
    const total = Object.keys(result).length
    res.json({
        msg: "get API - totales",
        total,
        result
    });
}
const userGet_x_id = async (req = request, res = response) => {
    const { id = 0, email = '' } = req.query;
    let user = new User();
    user.idUser === undefined ? user.idUser = 0 : user.idUser = Number(id);
    user.emailUser === undefined ? user.emailUser = '' : user.emailUser = email;

    const result = await user.getUserItem();
    res.json({
        msg: "get API - x item",
        result,
    });
}
const userPost = async (req = request, res = response) => {
    const query = req.body;
    let user = new User(query);
    //user.roleUser === undefined ? user.roleUser = 0 : user.roleUser = Number(id);
    //user.roleUser === undefined ? user.roleUser = 0 : user.roleUser = Number(id);
    console.log('password', user.passwordUser);
    const newUser = await user.postInsertUser();
    res.json({
        msg: "post API",
        newUser
    });
}
const userPut = async (req = request, res = response) => {
    const { id, email } = req.query;
    if (id != undefined && email != undefined) {
        return console.log('sali a comer');
    }
    const { idUser, passwordUser, emailUser, ...query } = req.body;
    let user = new User(query);

    if (email === undefined) {
        user.idUser = Number(id);
        let [obj1] = await user.getID();
        user.emailUser = obj1.emailUser;
    }
 /*
    if (id === undefined) {
        user.emailUser = email;
        let [obj2] = await user.getEmail();
        user.idUser = obj2.idUser;
    }*/
    const result = await user.putUpDataUser();

    res.json({
        msg: "put API - controlador",
        //result,
        user
    });
}
const userPatchPassword = (req, res = response) => {
    res.json(
        {
            msg: "patch API - controlador"
        }
    );
}
const userDelete = (req, res = response) => {

    res.json(
        {
            msg: "delete API - controlador"
        }

    );
}

module.exports = {
    userGet,
    userGet_x_id,
    userPost,
    userPut,
    userPatchPassword,
    userDelete
}