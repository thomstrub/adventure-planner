var router = require('express').Router();
var hikingCtrl = require('../controllers/hiking');

router.get('/', hikingCtrl.isLoggedIn, hikingCtrl.index);
router.get('/new', hikingCtrl.isLoggedIn, hikingCtrl.new);





module.exports = router;