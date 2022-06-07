const { Router } = require('express');
const { check, query } = require('express-validator');
const { validatorField } = require('../middlewares/validatorField');
const { isEmailValidate,
        isIdValidateGet,
        isEmailValidateGet,
        isRoleValidate,
        isStatusValidate,
        isGoogleValidate } = require('../helpers/db-validator');

const { userGet,
        userGet_x_id,
        userPost,
        userPut,
        userPatchPassword,
        userDelete,
        userGetOthers
} = require('../controllers/user');
const router = Router();

router.get('/', userGet);
router.get('/item/', [
        check('id').custom(isIdValidateGet),
        query('email').custom(isEmailValidateGet),
        validatorField
], userGet_x_id);

router.get('*', userGetOthers);

router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastname', 'El apellido es obligatorio').not().isEmpty(),
        check('password', 'La contraseña no debe ser menor a 6 caracteres').isLength({ min: 6 }),
        check('email').custom(isEmailValidate),
        check('email', 'Correo ingresado no valido').isEmail(),
        check('role').custom(isRoleValidate),
        check('status').custom(isStatusValidate),
        check('google').custom(isGoogleValidate),
        validatorField
], userPost);

router.put('/item/', [
        //  query('id').custom(isIdValidate),
        //   query('email').custom(isEmailValidate),
        check('name', 'El campo es obligatorio').not().isEmpty(),
        check('lastname', 'El campo es obligatorio').not().isEmpty(),
        check('role').custom(isRoleValidate),
        check('status').custom(isStatusValidate),
        check('google').custom(isGoogleValidate),
        validatorField
], userPut);
router.patch('/item/password/', userPatchPassword);
router.delete('/item/', userDelete);

module.exports = router;