const { Router } = require('express');
const { check, query } = require('express-validator');
/*
const { validatorField } = require('../middlewares/validatorField');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole,isRole,alsoUser } = require('../middlewares/validate-role');
*/

const {
        validatorField,
        validatorEmailBody,
        validatorFieldQuery,
        validatorEmailHeader,
        validateJWT,
        isAdminRole,
        isRole,
        alsoUser
} = require('../middlewares');

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

router.get('/',
        /*
        [
                validateJWT,
                isRole('ADMIN_ROLE','DEV_ROLE'),
                validatorField
        ], 
        */
        userGet);

router.get('/:id',
        /*
        [
                validateJWT,
                isRole('ADMIN_ROLE','DEV_ROLE'),
                validatorField
        ], 
        */
        userGet_x_id);


router.post('/', [
        validatorEmailBody,
        check('name', 'Todos los campos son obligatorios').not().isEmpty(),
        check('lastname', 'Todos los campos son obligatorios').not().isEmpty(),
        check('password', 'La contraseña no debe ser menor a 6 caracteres').isLength({ min: 6 }),
        check('email', 'Correo ingresado no valido').isEmail(),
        /*
        validateJWT,
        isAdminRole,
        */
        check('role').custom(isRoleValidate),
        check('status').custom(isStatusValidate),
        validatorField
], userPost);

router.put('/:id', [
        validatorEmailHeader,
        /*
        validateJWT,
        alsoUser,
        //  query('id').custom(isIdValidate),
        //   query('email').custom(isEmailValidate),
        check('name', 'El campo es obligatorio').not().isEmpty(),
        check('lastname', 'El campo es obligatorio').not().isEmpty(),
        check('role').custom(isRoleValidate),
        check('status').custom(isStatusValidate),
        check('google').custom(isGoogleValidate),
        */
       validatorField
],userPut);
router.patch('/password/:id', userPatchPassword);
router.delete('/:id', [
     //   validateJWT,
       // isAdminRole,
        validatorField
], userDelete);

module.exports = router;