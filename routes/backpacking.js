var router = require('express').Router();
var backpackingCtrl = require('../controllers/backpacking');



router.post('/', backpackingCtrl.isLoggedIn, backpackingCtrl.create);
router.get('/:id', backpackingCtrl.isLoggedIn,  backpackingCtrl.show);
router.get('/:id/edit', backpackingCtrl.isLoggedIn, backpackingCtrl.edit);
router.put('/:id', backpackingCtrl.isLoggedIn, backpackingCtrl.update)


module.exports = router;