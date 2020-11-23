const User = require('../models/user');

module.exports = {
    isLoggedIn,
    new: newBackpack,
    index
}

const nav = ['Find Adventure', 'Add Adventure', 'About'];

//define authorization function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/auth/google');
    }
}
function newBackpack(req, res) {
    res.render('adventures/backpacking/new', {
        title: 'Plan a Hike',
        navBar: nav
    })
}

function index(req, res) {
    console.log('index call');
}