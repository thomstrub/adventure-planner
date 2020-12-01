const User = require('../models/user');
const Hike = require('../models/adventure/hike');
const Backpack = require('../models/adventure/backpack');



module.exports = {
    index,
    isLoggedIn,
    new: newAdventure
}
const nav = {
    'Find Adventure': '/adventures',
    'Add Adventure': '/adventures/new'
    
}
const keys = Object.keys(nav);

const region = {
    primary: Hike.schema.path('region.primary').enumValues,
    secondary: Hike.schema.path('region.secondary').enumValues,
    subRegion: Hike.schema.path('region.subRegion').enumValues
}

async function index(req, res, next) {
    try {
        let user = req.user;
        const allHikes = await Hike.find({});
        const allBackpacks = await Backpack.find({});
        let userAdventures = [];

        // filter allHikes to just userHikes
        let stringId = user.id.toString()

        // let userHikes = [];
        allBackpacks.forEach((b) => {

            // concatonate details link
            b.detailsLink += b._id;
            if(b.userId === stringId) {
                userAdventures.push(b);
            }
        });

        allHikes.forEach((h) => {

            // concatonate details link
            h.detailsLink += h._id;
            
            if(h.userId === stringId) {
                userAdventures.push(h);
            }
        });
        res.render('adventures/index', {
            title: 'Adventure Home',
            navBar: nav,
            keys,
            adventures: userAdventures
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