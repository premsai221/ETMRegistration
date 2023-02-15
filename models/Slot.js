const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    slotid: {
        type:Number,
        unique:true
    },
    day: Number,
    timeslot: {
        type:String,
        min:0,
        max:8
    },
    freeSlots: Number
});

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;