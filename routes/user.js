const { Router } = require('express');
const { check, query } = require('express-validator');
/*
const { validatorField } = require('../middlewares/validatorField');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole,isRole,alsoUser } = require('../middlewares/validate-role');
*/

const  {
        validatorField,
        validateJWT,
        isAdminRole,
        isRole,
        alsoUser
}=require('../middlewares');

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

const router = Router('ADMIN_ROLE');

router.get('/', [
        validateJWT,
        isRole('ADMIN_ROLE','DEV_ROLE'),
        validatorField
], userGet);
router.get('/item/', [
        validateJWT,
        isRole('ADMIN_ROLE','DEV_ROLE'),
        check('id').custom(isIdValidateGet),
        query('email').custom(isEmailValidateGet),
        validatorField
], userGet_x_id);

router.get('*', userGetOthers);

router.post('/', [
        validateJWT,
        isAdminRole,
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
        validateJWT,
        alsoUser,
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
router.delete('/item/', [
        validateJWT,
        isAdminRole,
        validatorField
], userDelete);

module.exports = router;