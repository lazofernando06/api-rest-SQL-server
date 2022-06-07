const Role = require('../models/role');
const Google = require('../models/google');
const Status = require('../models/status');
const User = require('../models/user');

const isIdValidateGet = async (id) => {
    if (id != undefined) {
        if (Number(id)) {
            let user = new User();
            user.idUser = parseInt(id);
            const idExist = await user.getRecordById();
            if (!idExist) {
                throw new Error(`El id sugerido: ${id} no existe en la DB`);
            }
        } else {
            throw new Error(`El id sugerido: ${id} debe ser un id valido`);
        }
    }
}
const isEmailValidateGet = async (email) => {
    /*
    String patternEmail =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
RegExp regExp = RegExp(patternEmail);

*/
    if (email != undefined) {
        if (true) {
            let user= new User();
            user.emailUser = email;
            const emailExist = await user.getRecordByEmail();
            if (!emailExist) {
                throw new Error(`El email sugeremailo: ${email} no existe en la DB`);
            }
        }
    }
}
const isEmailValidate = async (email) => {
    let user = new User();
    user.emailUser = email;
    const emailExist = await user.getRecordByEmail();
    if (emailExist) {
        throw new Error(`El email sugerido: ${email} ya existe en la DB`);
    }
}
const isRoleValidate = async (typeRole = '') => {
    const role = new Role({ typeRole });
    const roleExist = await role.getRoleItem();
    if (!roleExist) {
        throw new Error(`El Rol: ${typeRole} no es un parametro valido`);
    }
}
const isStatusValidate = async (nameStatus = '') => {
    const status = new Status({ nameStatus });
    const statusExist = await status.getStatusItem();
    if (!statusExist) {
        throw new Error(`El Estado: ${nameStatus} no es un parametro valido`);
    }
}
const isGoogleValidate = async (statusGoogle = '') => {
    const google = new Google({ statusGoogle });
    const googleExist = await google.getGoogleItem();
    if (!googleExist) {
        throw new Error(`El Estado: ${statusGoogle} no es un parametro valido`);
    }
}





module.exports = {
    isIdValidateGet,
    isEmailValidateGet,
    isEmailValidate,
    isRoleValidate,
    isStatusValidate,
    isGoogleValidate,
}