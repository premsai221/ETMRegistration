const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    day: Number,
    timeslot: String,
    freeSlots: Number
});

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;