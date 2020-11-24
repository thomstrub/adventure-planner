var router = require('express').Router();
var backpackingCtrl = require('../controllers/backpacking');



router.post('/', backpackingCtrl.isLoggedIn, backpackingCtrl.create);



module.exports = router;