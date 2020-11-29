const User = require('../models/user');
const Backpack = require('../models/adventure/backpack');
const Hike = require('../models/adventure/hike')

module.exports = {
    isLoggedIn,
    create,
    show,
    edit,
    update,
    delete: deleteBackpack
    
}

// Constants for use in rendering
const nav = {
    'Find Adventure': '/adventures',
    'Add Adventure': '/adventures/new',
    About: '#'
}
const keys = Object.keys(nav);

const region = {
    primary: Backpack.schema.path('region.primary').enumValues,
    secondary: Backpack.schema.path('region.secondary').enumValues,
    subRegion: Backpack.schema.path('region.subRegion').enumValues
}


// functions

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
        //  related hikes
        let user = req.user;
        const allHikes = await Hike.find({});
        const allBackpacks = await Backpack.find({});
        let userAdventures = [];

        // filter allHikes to just userHikes
        let stringId = user.id.toString()

        // let userHikes = [];
        allBackpacks.forEach((b) => {

            console.log(b.userId, "b.userId <-----------", stringId, "<-------- stringId")
            if(b.userId === stringId) {
                userAdventures.push(b);
            }
        });

        allHikes.forEach((h) => {
            if(h.userId === stringId) {
                userAdventures.push(h);
            }
        });
        
        const backpackObj = await Backpack.findById(req.params.id);
        res.render('adventures/backpacking/show', {
            backpack: backpackObj,
            title: backpackObj.name,
            navBar: nav,
            keys,
            adventures: userAdventures
        });

    } catch(err){
        res.send(err);
    }
}

async function edit(req, res) {
    try{
        const backpackObj = await Backpack.findById(req.params.id);

        // rendering related hikes
        let user = req.user;
        const allHikes = await Hike.find({});
        const allBackpacks = await Backpack.find({});
        let userAdventures = [];

        // filter allHikes to just userHikes
        let stringId = user.id.toString()

        // let userHikes = [];
        allBackpacks.forEach((b) => {

            console.log(b.userId, "b.userId <-----------", stringId, "<-------- stringId")
            if(b.userId === stringId) {
                userAdventures.push(b);
            }
        });

        allHikes.forEach((h) => {
            if(h.userId === stringId) {
                userAdventures.push(h);
            }
        });

        res.render('adventures/backpacking/edit', {
            backpack: backpackObj,
            title: backpackObj.name,
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
        const backpackObj = await Backpack.findById(req.params.id);
        req.body.region = {
            primary: req.body.primary,
            secondary: req.body.secondary,
            subRegion: req.body.subRegion
        }

        // push to features array
        req.body.features = [];
        if(req.body.waterFeature) req.body.features.push(req.body.waterFeature);
        if(req.body.epicView) req.body.features.push(req.body.epicView);

        // change on to Boolean
        req.body.waterSources = !!req.body.waterSources;
        req.body.riverCrossings = !!req.body.riverCrossings;
        req.body.scrambling = !!req.body.scrambling;
        req.body.carCamping = !!req.body.carCamping;


        //  related hikes
        let user = req.user;
        const allHikes = await Hike.find({});
        const allBackpacks = await Backpack.find({});
        let userAdventures = [];

        // filter allHikes to just userHikes
        let stringId = user.id.toString()

        // let userHikes = [];
        allBackpacks.forEach((b) => {

            console.log(b.userId, "b.userId <-----------", stringId, "<-------- stringId")
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
        console.log(bodyKeys, "bodyKeys update <-------------------")
        let relatedArray = [];
        
        userAdventures.forEach((a) => {
            let aIdString = a._id.toString();
            console.log(relatedArray, "relatedArray-------------------%%%%%%%%");

            if(bodyKeys.includes(aIdString)) relatedArray.push(req.body[a._id]);

        });

        req.body.relatedAdventures = relatedArray;
        console.log(req.body.relatedAdventures, "req.body.relatedAdventures");
        

        // add req.body to model object
        for (const key in req.body) {
            console.log(key, "<=-=-=-=-=-=-=------key----=-=--=-=-=-");
            backpackObj[key] = req.body[key];
        }
        console.log(req.body, "req.body <----------- bp update")
        console.log(backpackObj, "backpackObj ---- ----- update")
        await backpackObj.save();
        res.redirect(`/adventures/backpacking/${req.params.id}`);
    } catch (err) {
        console.log("update error");
        res.send(err);
    }
}

async function deleteBackpack(req, res){
    try{
        const backpack = await Backpack.findById(req.params.id)
        await backpack.remove();
        res.redirect('/adventures');

    } catch (err){
        console.log('delete error')
        res.send(err);
    }
}