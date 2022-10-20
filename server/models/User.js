const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now
    },
    hash: String,
    salt: String
})

module.exports = mongoose.model('User', userSchema);