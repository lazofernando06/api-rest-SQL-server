const { Router } = require('express');
const { check, query } = require('express-validator');


const { validatorField } = require('../middlewares/validatorField');

const router = Router();
//todas las categorias
router.get('/',(req,res)=>{
    res.json('get');
});
//una categoria por id
router.get('/:id',(req,res)=>{
    res.json('get x id');
});
//crear categoria 
router.post('/:id',(req,res)=>{
    res.json('post');
});

router.get('/:id',(req,res)=>{
    res.json('post');
});
module.exports = router;