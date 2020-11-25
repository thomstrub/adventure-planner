var router = require('express').Router();
const { isLoggedIn } = require('../controllers');
var hikingCtrl = require('../controllers/hiking');

router.get('/', hikingCtrl.isLoggedIn, hikingCtrl.index);
router.get('/new', hikingCtrl.isLoggedIn, hikingCtrl.new);

router.post('/', hikingCtrl.isLoggedIn, hikingCtrl.create);
router.get('/:id/edit', hikingCtrl.isLoggedIn, hikingCtrl.edit);
router.get('/:id', hikingCtrl.isLoggedIn,  hikingCtrl.show)





module.exports = router;