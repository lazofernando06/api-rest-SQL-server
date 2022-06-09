"use strict"

const { request, response } = require('express');
const User = require('../models/user');

const userGet = async (req = request, res = response) => {
    let user = new User();

    if (req.query.id == undefined && req.query.email == undefined) {
        let result = await user.getTotalUserRecord();
        const total = result.length;
        res.json({
            msg: "get API - totales",
            total,
            result
        });
    }

}
const userGet_x_id = async (req = request, res = response) => {
    let user = new User();
    let result = null;
    let item = '';
    if (Number(req.params.id)) {
        user.idUser = Number(req.params.id);
        item = 'id';
        result = await user.getRecordById();

    } else {
        user.emailUser = req.params.id;
        item = 'email';
        result = await user.getRecordByEmail();
    }
    console.log(user.idUser, 'id');
    if (result === null) {
        return res.json({
            msg: `El parametro sugerido: ${req.params.id} no existe en la DB`
        });
    }

    res.json({
        msg: `get API x ${item} `,
        result
    });

}
const userPost = async (req = request, res = response) => {
    const query = req.body;
    let user = new User(query);
    const result = await user.postInsertUser();
    res.json({
        msg: "post API",
        result
    });
}
const userPut = async (req = request, res = response) => {
    const query = req.body;
    let user = new User(query);

    let result = null
    let item = '';
    if (Number(req.params.id)) {
        user.idUser = Number(req.params.id);
        item = 'id';
        result = await user.getRecordById();

    } else {
        user.emailUser = req.params.id;
        item = 'email';
        result = await user.getRecordByEmail();
    }


    if (result === null) {
        return res.json({
            msg: `El parametro sugerido: ${req.params.id} no existe en la DB`
        });
    }
    user.idUser = result.id;
    result = await user.putUpDataUser();
    res.json({
        msg: `put API x ${item} `,
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
    /*
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
    */
}
/*
const userGetOthers = (req, res = response) => {
    res.sendFile(__dirname + 'public/404.html');
}
*/
module.exports = {
    userGet,
    userGet_x_id,
    userPost,
    userPut,
    userPatchPassword,
    userDelete,
}