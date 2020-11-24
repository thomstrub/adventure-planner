const mongoose = require('mongoose');



const regionSchema = new mongoose.Schema({
    primary: {
        type: String,
        enum: ['Eastern Cascades', 'Western Cascades', 'Olympic Peninsula']
    },
    secondary: {
        type: String,
        enum: ['North Cascades', 'Central Cascades', 'South Cascades', 'Olympic Mountains', 'Olympic Coast']
    },
    subRegion: {
        type: String,
        enum: ['Mt. Baker', 'North Cascades National Park', 'Paysatan', 'Methow / Sawtooth', 'Lake Wenatchee', 'Icicle Creek',
         'Blue Mountains', 'Entiat', 'Mountain Loop Highway', 'Suiattle River Valley',
          'Teanaway', 'West Slope', "Steven's Pass", 'Rainy Pass', 'Mount Adams']
    }
}, {
    timestamps: true
});



// Create your User Model
const hikeSchema = new mongoose.Schema({
    name: String,
    region: [regionSchema],
    elevationGain: String,
    highPoint: String,
    roundtrip: String,
    features: {
        type: String,
        enum: ['Epic View Point', 'Cool Water Feature']
    },
    meltout: {
        type: String,
        enum: ['May', 'June', 'July', 'August']
    },
    travelTime: String,
    popularity: {
        type: String,
        enum: ['Low', 'Medium-Low', 'Medium', 'Too Popular']
    },
    waterSources: Boolean,
    riverCrossings: Boolean,
    scrambling: Boolean,
    carCamping: Boolean,
    weatherLink: String,
    reviewLink: String,
    mapLink: String,
    photoLink: String

}, {
    timestamps: true
});



module.exports = mongoose.model('Hike', hikeSchema);