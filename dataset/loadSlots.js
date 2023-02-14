const Slot = require("../models/Slot");

const slots = [
    {
        day: 1,
        timeslot: "13:00PM - 13:40PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "13:10PM - 13:50PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "13:20PM - 14:00PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "13:30PM - 14:10PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "13:40PM - 14:20PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "13:50PM - 14:30PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "14:00PM - 14:40PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "14:10PM - 14:50PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "14:20PM - 15:00PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "14:30PM - 15:10PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "14:40PM - 15:20PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "14:50PM - 15:30PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "15:00PM - 15:40PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "15:10PM - 15:50PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "15:20PM - 16:00PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "15:30PM - 16:10PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "15:40PM - 16:20PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "15:50PM - 16:30PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "16:00PM - 16:40PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "16:10PM - 16:50PM",
        freeSlots: 12
    },
    {
        day: 1,
        timeslot: "16:20PM - 17:00PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "09:00AM - 09:40AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "09:10AM - 09:50AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "09:20AM - 10:00AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "09:30AM - 10:10AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "09:40AM - 10:20AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "09:50AM - 10:30AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "10:00AM - 10:40AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "10:10AM - 10:50AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "10:20AM - 11:00AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "10:30AM - 11:10AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "10:40AM - 11:20AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "10:50AM - 11:30AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "11:00AM - 11:40AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "11:10AM - 11:50AM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "11:20AM - 12:00PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "11:30AM - 12:10PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "11:40AM - 12:20PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "11:50AM - 12:30PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "12:00PM - 12:40PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "12:10PM - 12:50PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "12:20PM - 13:00PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "12:30PM - 13:10PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "12:40PM - 13:20PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "12:50PM - 13:30PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "13:00PM - 13:40PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "13:10PM - 13:50PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "13:20PM - 14:00PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "13:30PM - 14:10PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "13:40PM - 14:20PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "13:50PM - 14:30PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "14:00PM - 14:40PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "14:10PM - 14:50PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "14:20PM - 15:00PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "14:30PM - 15:10PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "14:40PM - 15:20PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "14:50PM - 15:30PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "15:00PM - 15:40PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "15:10PM - 15:50PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "15:20PM - 16:00PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "15:30PM - 16:10PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "15:40PM - 16:20PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "15:50PM - 16:30PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "16:00PM - 16:40PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "16:10PM - 16:50PM",
        freeSlots: 12
    },
    {
        day: 2,
        timeslot: "16:20PM - 17:00PM",
        freeSlots: 12
    },
]

async function loadSlotData() {
    var loadedSlots = await Slot.find();
    if (loadedSlots.length === 0) {
        await Slot.insertMany(slots);
        console.log("Slots have been inserted !!");
    }

}

module.exports = loadSlotData;