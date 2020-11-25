const User = require('../models/user');
const Backpack = require('../models/adventure/backpack');

module.exports = {
    isLoggedIn,
    create,
    show
    
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

function create(req, res) {
    //add userId
    console.log(req.user, "req.user <------------------------")
    req.body.userId = req.user._id;

    console.log(req.body, "req.body <------------------------")
    // change on to Boolean
    req.body.waterSources = !!req.body.waterSources;
    req.body.riverCrossings = !!req.body.riverCrossings;
    req.body.scrambling = !!req.body.scrambling;
    req.body.carCamping = !!req.body.carCamping;
    

    req.body.region = {
        primary: req.body.primary,
        secondary: req.body.secondary,
        subRegion: req.body.subRegion
    }

    // create a new database entry
    const backpack = new Backpack(req.body);

    //add detailsLink
    backpack.detailsLink = '/adventures/backpacking/'

    //add user
    backpack.userId = req.user._id;

    backpack.save(function(err){
        console.log(backpack, "backpack <----------------");
    //errors
        if(err) return res.redirect('/adventures');
        res.redirect('/adventures');
    })

}

async function show(req, res) {
    try{
        console.log(nav, "<------this is the nav ", keys, "<------ these are the keys")
        const backpackObj = await Backpack.findById(req.params.id);
        res.render('adventures/backpacking/show', {
            backpack: backpackObj,
            title: backpackObj.name,
            navBar: nav,
            keys
        })

    } catch(err){
        res.send(err);
    }
}