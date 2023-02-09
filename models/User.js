const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:String,
    timeslot: String,
    booked: Boolean
});

const User = mongoose.model("User", userSchema);
module.exports = User;