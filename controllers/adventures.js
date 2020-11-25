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
        let userHikes = [];
        allHikes.forEach((h) => {

            // concatonate details link
            h.detailsLink += h._id;

            // filter allHikes to just userHikes
            console.log(req.user._id, "<==========================req.user_id");
            console.log(h.userId, "h.userId <==========================");
            req.user._id = req.user._id.toString().trim();
            h.userId = h.userId.toString().trim();
            console.log(typeof h.userID, "type of h.userId");
            console.log(typeof req.user._id, "type of req.user._id");
            if(h.userId === req.user._id) {
                userHikes.push(h);
                console.log(true);
                console.log(userHikes, "userHikes inside <=-==-=-=-=-=-=-=-=-=-=-=-=-=");
            }
            console.log(userHikes, "userHikes outside <=-==-=-=-=-=-=-=-=-=-=-=-=-=");
        })
        // console.log(allHikes, "allHikes <-------------")
        res.render('adventures/index', {
            title: 'Adventure Home',
            navBar: nav,
            keys,
            hikes: userHikes
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