const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:String,
    timeslot: String,
    password: String,
    day: Number,
    booked: Boolean
});

const User = mongoose.model("User", userSchema);
module.exports = User;