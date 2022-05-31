const Role = require('../models/role');
const User = require('../models/user');

const emailExist = async (emailUser = '') => {
    const user = new User({emailUser});
    const idExist = await user.getEmail();

    if (idExist) {
        throw new Error(`El email sugerido: ${emailUser} ya existe en la DB`);
    }
}

const isRoleValidate = async (typeRole = '') => {
    const role = new Role({ typeRole });
    const roleExist = await role.getRoleItem();
    if (!roleExist) {
        throw new Error(`El Rol: ${typeRole} no está registrado en la DB`);
    }
}

module.exports = {
    emailExist,
    isRoleValidate,
}