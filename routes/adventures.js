var router = require('express').Router();
var adventuresCtrl = require('../controllers/adventures');

router.get('/adventures', isLoggedIn, adventuresCtrl.index);



// define our authorization function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/auth/google')
    }
}

//define authorization function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/auth/google');
    }
}

module.exports = router;