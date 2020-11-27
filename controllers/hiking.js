const User = require('../models/user');
const Hike = require('../models/adventure/hike');

module.exports = {
    isLoggedIn,
    new: newHike,
    index,
    create,
    show,
    edit,
    update,
    delete: deleteHike
}

// -------------------------constants for render function--------------
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


//--------------------------------functions---------------------------

//define authorization function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/auth/google');
    }
}
function newHike(req, res) {
    res.render('adventures/hiking/new', {
        title: 'Plan a Hike',
        navBar: nav,
        keys,
        region
    })
}

function index(req, res) {
    console.log('index call');
}

function create(req, res) {
    //add userId
    console.log(req.user, "req.user <------------------------")
    req.body.userId = req.user._id;
    console.log(req.body.userId)
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
    const hike = new Hike(req.body);
     //add detailsLink
    hike.detailsLink = '/adventures/hiking/';
    //add userId 
    hike.userId = req.user._id;
    console.log(hike.userId, "hike.userId from create <------------")
    hike.save(function(err){
        
    //errors
        if(err) return res.redirect('/adventures');
        res.redirect('/adventures');
    })

}

async function show(req, res) {
    try{
        
        const hikeObj = await Hike.findById(req.params.id);
        res.render('adventures/hiking/show', {
            hike: hikeObj,
            title: hikeObj.name,
            navBar: nav,
            keys
        })

    } catch(err){
        res.send(err);
    }
}

async function edit(req, res) {
    try{
        const hikeObj = await Hike.findById(req.params.id);
        res.render('adventures/hiking/edit', {
            hike: hikeObj,
            title: hikeObj.name,
            navBar: nav,
            keys,
            region
        })
    }catch(err){
        res.send(err);
    }
}

async function update(req, res) {
    try {
        const hikeObj = await Hike.findById(req.params.id);
        req.body.region = {
            primary: req.body.primary,
            secondary: req.body.secondary,
            subRegion: req.body.subRegion
        }

        // change on to Boolean
        req.body.waterSources = !!req.body.waterSources;
        req.body.riverCrossings = !!req.body.riverCrossings;
        req.body.scrambling = !!req.body.scrambling;
        req.body.carCamping = !!req.body.carCamping;

        for (const key in req.body) {
            console.log(key, "<=-=-=-=-=-=-=------key----=-=--=-=-=-");
            hikeObj[key] = req.body[key];
        }


        await hikeObj.save();
        res.redirect(`/adventures/hiking/${req.params.id}`);
    } catch (err) {
        console.log("update error");
        res.send(err);
    }
}

async function deleteHike(req, res){
    try{
        const hike = await Hike.findById(req.params.id)
        await hike.remove();
        res.redirect('/adventures');

    } catch (err){
        console.log('delete error')
        res.send(err);
    }
}