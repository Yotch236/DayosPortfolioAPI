const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname is required']
    },

    lastname: {
        type: String,
        required: [true, 'Lastname is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required']
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    isAdmin: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', UserSchema);