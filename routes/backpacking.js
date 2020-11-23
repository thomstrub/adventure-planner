var router = require('express').Router();
var backpackingCtrl = require('../controllers/backpacking');

router.get('/', backpackingCtrl.isLoggedIn, backpackingCtrl.index);
router.get('/new', backpackingCtrl.isLoggedIn, backpackingCtrl.new);





module.exports = router;