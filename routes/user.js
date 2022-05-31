const { Router } = require('express');
const { check } = require('express-validator');
const { validatorField, validatorFieldUpdate } = require('../middlewares/validatorField');
const { isRoleValidate, emailExist } = require('../helpers/db-validator');

const { userGet,
        userGet_x_id,
        userPost,
        userPut,
        guestDelete,
} = require('../controllers/user');
const router = Router();

router.get('/', userGet);
router.get('/item/', userGet_x_id);
router.post('/', [
        check('nameUser', 'El nombre es obligatorio').not().isEmpty(),
        check('lastnameUser', 'El apellido es obligatorio').not().isEmpty(),
        check('passwordUser', 'La contraseña no debe ser menor a 8 caracteres').isLength({ min: 6 }),
        check('emailUser', 'correo no valido').isEmail(),
        check('emailUser').custom(emailExist),
        validatorField
], userPost);
router.put('/item', [
        check('nameUser', 'El nombre es obligatorio').not().isEmpty(),
        check('lastnameUser', 'El apellido es obligatorio').not().isEmpty(),
        check('passwordUser', 'La contraseña no debe ser menor a 8 caracteres').isLength({ min: 6 }),
        check('emailUser', 'correo no valido').isEmail(),

        check('Role').custom(isRoleValidate),

        validatorField
], userPut);

/*
router.patch('/:id', guestPut);
router.delete('/', guestDelete);
*/

module.exports = router;