var router = require('express').Router();
var adventuresCtrl = require('../controllers/adventures');

router.get('/adventures', adventuresCtrl.isLoggedIn, adventuresCtrl.index);






module.exports = router;