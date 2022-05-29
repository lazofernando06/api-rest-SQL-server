const { Router } = require('express');
const { userGet, 
        userGet_x_id, 
        userPost, 
        guestPut, 
        guestDelete, 
       } = require('../controllers/user');
const router = Router();

router.get('/', userGet);
router.get('/item/', userGet_x_id);
router.post('/', userPost);

/*
router.patch('/', guestPatch);
router.put('/:id', guestPut);
router.delete('/', guestDelete);
*/

module.exports = router;