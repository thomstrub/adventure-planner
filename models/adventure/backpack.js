const mongoose = require('mongoose');

// Create your User Model
const backpackSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);