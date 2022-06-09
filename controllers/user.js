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
    let user = new User();
    let result = null;
    let item = '';
    user.passwordUser = req.body.password;
    if (Number(req.params.id)) {
        user.idUser = Number(req.params.id);
        item = 'id';
        result = await user.getRecordById();
    } else {
        user.emailUser = req.params.id;
        item = 'email';
        result = await user.getRecordByEmail();
        user.idUser = result.id;
    }
    if (result === null) {
        return res.json({
            msg: `El parametro sugerido: ${req.params.id} no existe en la DB`
        });
    }

    if (result.password === user.passwordUser) {
        return res.json({
            msg: 'La contraseña ingresaada es la misma'
        });
    }
    result = await user.patchUpPasswordUser();
    res.json({
        msg: `la contraseña del ${item} a sido actualizada`,
        result
    });

}
const userDelete = async (req, res = response) => {
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
        console.log(result,'resultado');
        user.idUser = result==null?null:result.id;
    }
    if (result === null) {
        return res.json({
            msg: `la cuenta del ${item}: ${req.params.id} no existe en la DB`
        });
    }

    result = await user.deleteUserRecord();
    res.json({
        msg: `la cuenta del ${item}: ${req.params.id} a sido eliminada`,
        result
    });

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