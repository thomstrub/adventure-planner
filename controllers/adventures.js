const User = require('../models/user');
const Hike = require('../models/adventure/hike');


module.exports = {
    index,
    isLoggedIn,
    new: newAdventure
}
const nav = {
    'Find Adventure': '/adventures',
    'Add Adventure': '/adventures/new',
    About: '#'
}
const keys = Object.keys(nav);

const region = {
    primary: Hike.schema.path('region.primary').enumValues,
    secondary: Hike.schema.path('region.secondary').enumValues,
    subRegion: Hike.schema.path('region.subRegion').enumValues
}

async function index(req, res, next) {
    try {
        const allHikes = await Hike.find({});
        console.log(allHikes, "allHikes <-------------")
        res.render('adventures/index', {
            title: 'Adventure Home',
            navBar: nav,
            keys,
            hikes: allHikes
        });
    } catch (err){
        res.send(err);
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
function newAdventure(req, res) {
    res.render('adventures/new', {
        title: 'Plan an Adventure',
        navBar: nav,
        keys,
        region
    })
}