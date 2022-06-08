

const validatorField = require('../middlewares/validatorField');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');

module.exports={
    ...validatorField,
    ...validateJWT,
    ...validateRole,
}