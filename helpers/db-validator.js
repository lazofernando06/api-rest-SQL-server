const Role = require('../models/role');
const User = require('../models/user');

const emailExist = async (email = '') => {
    const emailUser = email;
    const user = new User({ emailUser });
    const idExist = await user.getEmail();

    if (idExist) {
        throw new Error(`El email sugerido: ${emailUser} ya existe en la DB`);
    }
}

const isRoleValidate = async (typeRole = '') => {
    const role = new Role({typeRole});
    console.log(typeRole);
    const roleExist = await Role.getRoleItem;
    console.log('hila',roleExist);
    if (!roleExist) {
        throw new Error(`El Rol: ${typeRole} no está registrado en la DB`);
    }
}

const idExist = async (id = 0) => {
    const idUser = parseInt(id);
    const user = new User({ idUser });
    const idExist = await user.getID();

    if (!idExist && id != 0) {
        throw new Error(`El id sugerido: ${id} no existe en la DB`);
    }
}
const emailExist1 = async (email = '') => {
    const emailUser = email;
    const user = new User({ emailUser });
    const idExist = await user.getEmail();

    if (!idExist && email != '') {
        throw new Error(`El email sugerido: ${email} no existe en la DB`);
    }
}

module.exports = {
    emailExist,
    isRoleValidate,
    idExist,
    emailExist1
}