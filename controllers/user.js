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
    const user = new User();
    const { id = 0, email = '' } = req.query;
    id == undefined ? user.idUser(0) : user.idUser(id);
    email == undefined ? user.emailUser('sdsdsdsd') : user.emailUser(email);
    console.log(user.idUser());
    console.log(user.emailUser());
  //  const result = await user.getUserItem();
    res.json({
        msg: "get API - x item",
  //      result,
    });
}
const userPost = async (req = request, res = response) => {
    const query = req.body;
    const user = new User(query);
    user.roleUser === undefined ? user.imgUser = 'USER_ROLE' : console.log('prueba');
    user.statusUser = 'ACTIVE';
    user.googleUser = 'NO ENABLE';
    user.imgUser === undefined ? user.imgUser = '' : console.log('prueba');
    const newUser = await user.postInsertUser();
    res.json({
        msg: 'hola',
        newUser
    });
}
const userPut = async (req = request, res = response) => {
    var { id = 0, email = '' } = req.query;
    const idUser = id * 1;
    const emailUser = email;
    const {
        nameUser,
        lastnameUser,
        imgUser,
        roleUser,
        statusUser,
        googleUser } = req.body;


    const role = new Role({ roleUser });
    console.log('userRole', roleUser);
    const roleExist = await role.getRoleItem();
    console.log('algun valor', roleExist);


    const user = new User({
        idUser,
        emailUser,
        nameUser,
        lastnameUser,
        imgUser,
        roleUser,
        statusUser,
        googleUser
    });

    const result = await user.putUpDataUser();

    res.json({
        msg: "put API - controlador",
        result
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