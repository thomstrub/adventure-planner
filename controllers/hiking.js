const User = require('../models/user');
const Hike = require('../models/adventure/hike');
const Backpack = require('../models/adventure/backpack')

module.exports = {
    isLoggedIn,
    new: newHike,
    create,
    show,
    edit,
    update,
    delete: deleteHike
}

// -------------------------constants for render function--------------
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


function create(req, res) {
    //add userId
    req.body.userId = req.user._id;
    // change on to Boolean
    req.body.waterSources = !!req.body.waterSources;
    req.body.riverCrossings = !!req.body.riverCrossings;
    req.body.scrambling = !!req.body.scrambling;
    req.body.carCamping = !!req.body.carCamping;

   // push to features array
   req.body.features = [];
   if(req.body.waterFeature) req.body.features.push(req.body.waterFeature);
   if(req.body.epicView) req.body.features.push(req.body.epicView);

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
    hike.save(function(err){
        
    //errors
        if(err) return res.redirect('/adventures');
        res.redirect('/adventures');
    })

}

async function show(req, res) {
    try{
        //  related hikes
        let user = req.user;
        const allHikes = await Hike.find({});
        const allBackpacks = await Backpack.find({});
        let userAdventures = [];

        // filter allHikes to just userHikes
        let stringId = user.id.toString()

        // let userHikes = [];
        allBackpacks.forEach((b) => {
            if(b.userId === stringId) {
                userAdventures.push(b);
            }
        });

        allHikes.forEach((h) => {
            if(h.userId === stringId) {
                userAdventures.push(h);
            }
        });
        const hikeObj = await Hike.findById(req.params.id);
        res.render('adventures/hiking/show', {
            hike: hikeObj,
            title: hikeObj.name,
            navBar: nav,
            keys,
            adventures: userAdventures
        })

    } catch(err){
        res.send(err);
    }
}

async function edit(req, res) {
    try{
        const hikeObj = await Hike.findById(req.params.id);

        // rendering related hikes
        let user = req.user;
        const allHikes = await Hike.find({});
        const allBackpacks = await Backpack.find({});
        let userAdventures = [];

        // filter allHikes to just userHikes
        let stringId = user.id.toString()

        // let userHikes = [];
        allBackpacks.forEach((b) => {
            if(b.userId === stringId) {
                userAdventures.push(b);
            }
        });

        allHikes.forEach((h) => {
            
            if(h.userId === stringId) {
                userAdventures.push(h);
            }
        });

        res.render('adventures/hiking/edit', {
            hike: hikeObj,
            title: hikeObj.name,
            navBar: nav,
            keys,
            region,
            adventures: userAdventures
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

        // push to features array
        req.body.features = [];
        if(req.body.waterFeature) req.body.features.push(req.body.waterFeature);
        if(req.body.epicView) req.body.features.push(req.body.epicView);

        //  related hikes setup
        let user = req.user;
        const allHikes = await Hike.find({});
        const allBackpacks = await Backpack.find({});
        let userAdventures = [];

        // filter allHikes to just userHikes
        let stringId = user.id.toString()

        // let userHikes = [];
        allBackpacks.forEach((b) => {
            if(b.userId === stringId) {
                userAdventures.push(b);
            }
        });

        allHikes.forEach((h) => {
            if(h.userId === stringId) {
                userAdventures.push(h);
            }
        });


        // search though keys for related hike key
        let bodyKeys = Object.keys(req.body);
        let relatedArray = [];
        
        userAdventures.forEach((a) => {
            let aIdString = a._id.toString();
            if(bodyKeys.includes(aIdString)) relatedArray.push(req.body[a._id]);

        });

        req.body.relatedAdventures = relatedArray;

        for (const key in req.body) {
            hikeObj[key] = req.body[key];
        }

        await hikeObj.save();
        res.redirect(`/adventures/hiking/${req.params.id}`);
    } catch (err) {
        res.send(err);
    }
}

async function deleteHike(req, res){
    try{
        const hike = await Hike.findById(req.params.id)
        await hike.remove();
        res.redirect('/adventures');

    } catch (err){
        res.send(err);
    }
}