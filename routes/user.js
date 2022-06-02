const { Router } = require('express');
const { check, query } = require('express-validator');
const { validatorField } = require('../middlewares/validatorField');
const { isEmailValidate, isIdValidateGet, isEmailValidateGet, isIdValidate } = require('../helpers/db-validator');

const { userGet,
        userGet_x_id,
        userPost,
        userPut,
        userPatchPassword,
        userDelete
} = require('../controllers/user');
const router = Router();

router.get('/', userGet);
router.get('/item/', [
        check('id').custom(isIdValidateGet),
        query('email').custom(isEmailValidateGet),
        validatorField
], userGet_x_id);
router.post('/', [
        check('nameUser', 'El nombre es obligatorio').not().isEmpty(),
        check('lastnameUser', 'El apellido es obligatorio').not().isEmpty(),
        check('passwordUser', 'La contraseña no debe ser menor a 6 caracteres').isLength({ min: 6 }),
        //  check('email').custom(isEmailValidate),
        //      check('email','Correo ingresado no es valido').isEmail(),
        validatorField
], userPost);
router.put('/item/', [
        query('id').custom(isIdValidate),
        query('email').custom(isEmailValidate),
        check('nameUser', 'El campo es obligatorio').not().isEmpty(),
        check('lastnameUser', 'El campo es obligatorio').not().isEmpty(),
        //check('roleUser').custom(isRoleValidate),
        validatorField
], userPut);
router.patch('/item/password/', userPatchPassword);
router.delete('/', userDelete);

module.exports = router;