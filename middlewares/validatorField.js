const { validationResult } = require('express-validator');
const User = require('../models/user');

const validatorField = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json(err)
    }
    next();
}
const validatorFieldQuery = (req, res, next) => {
    if (req.params.id === undefined) {
        return res.status(400).json({
            msg: 'Requiere ingresar un parametro id / email valido.'
        });
    }
    next();
}
const validatorEmailBody = async (req, res, next) => {
    let user = new User();
    user.emailUser = req.body.email;
    const existEmail = await user.getRecordByEmail();
    if (existEmail) {
        return res.status(400).json({
            msg: 'El email ya se encuentra registrado'
        });
    }
    next();
}
const validatorEmailHeader = async (req, res, next) => {
    let user = new User();
    let result = null;
    let item = '';
    if (!req.params.id) {
        return res.status(400).json({
            msg:'Ingresar un id / email valido',
        });
    }
    if (Number(req.params.id)) {
        user.idUser = Number(req.params.id);
        item = 'id';
        result = await user.getRecordById();

    } else {
        user.emailUser = req.params.id;
        item = 'email';
        result = await user.getRecordByEmail();
    }

    if (!result) {
        return res.status(400).json({
            msg:`El ${item} ingresado no se encuentra en la DB.`,
        });
    }
    next();
}
module.exports = {
    validatorField,
    validatorFieldQuery,
    validatorEmailBody,
    validatorEmailHeader
}