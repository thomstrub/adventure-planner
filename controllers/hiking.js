const User = require('../models/user');
const Hike = require('../models/adventure/hike');

module.exports = {
    isLoggedIn,
    new: newHike,
    index,
    create
}


const nav = {
    'Find Adventure': 'adventures',
    'Add Adventure': 'adventures/new',
    About: '#'
}
const keys = Object.keys(nav);

const region = {
    primary: Hike.schema.path('region.primary').enumValues,
    secondary: Hike.schema.path('region.secondary').enumValues,
    subRegion: Hike.schema.path('region.subRegion').enumValues
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
    console.log(region, "<------------region")
    res.render('adventures/hiking/new', {
        title: 'Plan a Hike',
        navBar: nav,
        region
    })
}

function index(req, res) {
    console.log('index call');
}

function create(req, res) {
    console.log(req.body, "req.body <------------------------")
    // change on to Boolean
    req.body.waterSources = !!req.body.waterSources;
    req.body.riverCrossings = !!req.body.riverCrossings;
    req.body.scrambling = !!req.body.scrambling;
    req.body.carCamping = !!req.body.carCamping;

    // create a new database entry
    const hike = new Hike(req.body);
    hike.save(function(err){
        console.log(hike, "hike <----------------");
    //errors
        if(err) return res.redirect('/adventures');
        res.redirect('/adventures');
    })
    



}