const User = require('../models/user');
const Hike = require('../models/adventure/hike');

module.exports = {
    isLoggedIn,
    new: newHike,
    index
}


const nav = ['Find Adventure', 'Add Adventure', 'About'];

const region = {
    primary: ['Eastern Cascades', 'Western Cascades', 'Olympic Peninsula'],
    secondary: ['North Cascades', 'Central Cascades', 'South Cascades', 'Olympic Mountains', 'Olympic Coast'],
    subRegion: ['Mt. Baker', 'North Cascades National Park', 'Paysatan', 'Methow / Sawtooth', 'Lake Wenatchee', 'Icicle Creek',
    'Blue Mountains', 'Entiat', 'Mountain Loop Highway', 'Suiattle River Valley',
     'Teanaway', 'West Slope', "Steven's Pass", 'Rainy Pass', 'Mount Adams']
}

//define authorization function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/auth/google');
    }
}
function newHike(req, res) {
    console.log(Hike, "<------------Hike")
    res.render('adventures/hiking/new', {
        title: 'Plan a Hike',
        navBar: nav,
        region
    })
}

function index(req, res) {
    console.log('index call');
}