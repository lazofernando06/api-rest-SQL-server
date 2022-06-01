const { Router } = require('express');
const { check,query,body } = require('express-validator');
const { validatorField } = require('../middlewares/validatorField');
const { isRoleValidate, emailExist, idExist, emailExist1 } = require('../helpers/db-validator');

//const { body, validationResult } = require('express-validator');

const { userGet,
        userGet_x_id,
        userPost,
        userPut,
        userPatchPassword,
        userDelete
} = require('../controllers/user');
const router = Router();

router.get('/', userGet);
router.get('/item/', userGet_x_id);
router.post('/', [
        check('nameUser', 'El nombre es obligatorio').not().isEmpty(),
        check('lastnameUser', 'El apellido es obligatorio').not().isEmpty(),
        check('passwordUser', 'La contraseña no debe ser menor a 6 caracteres').isLength({ min: 6 }),
        check('email', 'correo no valido').isEmail(),
        check('email').custom(emailExist),
        validatorField
], userPost);
router.put('/item/', [
        query('id').custom(idExist),
        query('email').custom(emailExist1),
        check('nameUser', 'El campo es obligatorio').not().isEmpty(),
        check('lastnameUser', 'El campo es obligatorio').not().isEmpty(),
        //check('roleUser').custom(isRoleValidate),
        validatorField
], userPut);
router.patch('/item/password/', userPatchPassword);
router.delete('/', userDelete);

module.exports = router;