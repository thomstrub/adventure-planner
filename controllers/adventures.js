const User = require('../models/user');

module.exports = {
    index,
    isLoggedIn,
    new: newAdventure
}
const nav = ['Find Adventure', 'Add Adventure', 'About'];

function index(req, res, next) {
    console.log(req.params, "req<----------");
    res.render('adventures/index', {
        title: 'Adventure Home',
        navBar: nav
    });
}

//define authorization function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/auth/google');
    }
}
function newAdventure(req, res) {
    res.render('adventures/new', {
        title: 'Plan an Adventure',
        navBar: nav
    })
}