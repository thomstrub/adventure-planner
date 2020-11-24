const User = require('../models/user');

module.exports = {
    index,
    dash,
    isLoggedIn
}


const nav = {
    'Find Adventure': 'adventures',
    'Add Adventure': 'adventures/new',
    About: '#'
}
const keys = Object.keys(nav);

function index(req, res, next) {
    res.render('index', {
        title: 'Adventure Planner Sign In',
        navBar: nav,
        keys
    });
}

function dash(req, res) {
    res.render('dashboard', {
        title: 'Adventure Dashboard',
        navBar: nav,
        keys
    });
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/auth/google');
    }
}