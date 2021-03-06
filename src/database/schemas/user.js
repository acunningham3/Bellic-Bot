const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordId: {
        type: String,
        require: true,
        unique: true,
    },
    displayName: {
        type: String,
        require: false,
        unique: false,
    },
    coinbaseId: {
        type: String,
        required: true,
        unique: true,
    },
    accessToken: {
        type: String,
        required: true,
        unique: true,
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('User', userSchema);