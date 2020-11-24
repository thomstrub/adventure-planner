var router = require('express').Router();
var adventuresCtrl = require('../controllers/adventures');

router.get('/', adventuresCtrl.isLoggedIn, adventuresCtrl.index);
router.get('/new', adventuresCtrl.isLoggedIn, adventuresCtrl.new);





module.exports = router;