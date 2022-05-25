const { Router } = require('express');
const { guestPost, 
        guestGet, 
        guestPatch, 
        guestPut, 
        guestDelete, 
       } = require('../controllers/guest');
const router = Router();


router.post('/', guestPost);
router.get('/', guestGet);
router.patch('/', guestPatch);
router.put('/:id', guestPut);
router.delete('/', guestDelete);



module.exports = router;