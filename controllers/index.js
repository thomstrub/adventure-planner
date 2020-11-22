const User = require('../models/user');

module.exports = {
    index
}

const nav = ['About'];

function index(req, res, next) {
    res.render('index', {
        title: 'Adventure Planner Sign In',
        navBar: nav
    });
}