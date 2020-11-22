const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    primary: String,
    secondary: String,
    subRegion: String
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
    waterSources: {
        type: String,
        enum: ['Yes', 'No']
    },
    riverCrossings: {
        type: String,
        enum: ['Yes', 'No']
    },
    weatherLink: String,
    reviewLink: String,
    mapLink: String,
    photoLink: String,
    scrambling: {
        type: String,
        enum: ['Yes', 'No']
    },
    carCamping: {
        type: String,
        enum: ['Yes', 'No']
    },


}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);