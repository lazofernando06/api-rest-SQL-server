const { Router } = require('express');
const { check, query } = require('express-validator');
const { postLogin } = require('../controllers/auth');
const { validatorField } = require('../middlewares/validatorField');

const router = Router();
router.post('/login',[
    
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El correo es obligatorio').not().isEmpty(),
    validatorField
],postLogin);

module.exports = router;