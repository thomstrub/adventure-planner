var router = require('express').Router();
var hikingCtrl = require('../controllers/hiking');

router.get('/', hikingCtrl.isLoggedIn, hikingCtrl.index);
router.get('/new', hikingCtrl.isLoggedIn, hikingCtrl.new);

router.post('/', hikingCtrl.create);

router.get('/:id', hikingCtrl.isLoggedIn, hikingCtrl.show)





module.exports = router;