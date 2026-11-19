const mongoose = require("mongoose");

require("dotenv").config();

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});


const userModel= mongoose.model("user", userschema);
module.exports = userModel;