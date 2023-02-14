const express = require("express");
const cookieJWTAuth = require("../middlewares/cookieJWTAuth");
const User = require("../models/User");
const Slot = require("../models/Slot");
const jwt =  require("jsonwebtoken");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const router = express.Router();

router.get('/', cookieJWTAuth, async function (req, res) {
    if (!req.userObj.booked)
    {
        res.sendFile(path.join(__dirname, "..", "views", "main.html"));
    }
    else {
        res.sendFile(path.join(__dirname, "..", "views", "booked.html"));
    }
});

router.get('/getslots', cookieJWTAuth, async function (req, res) {
    var slotData = await Slot.find();
    var slotObj = {slots:{...slotData}};
    return res.json(JSON.stringify(slotObj))
})

router.post('/bookslot', cookieJWTAuth, async function(req, res) {
    const slotTiming = req.body.timeslot;
    const dayInt = Number.parseInt(req.body.day);
    var resObj = {
        booked: false,
        message: "Sorry the slot is full"
    }
    const slotObject = await Slot.findOne({timeslot: slotTiming, day:dayInt});
    if (slotObject.freeSlots > 0){
        slotObject.freeSlots -= 1;
        slotObject.save();
        await User.updateOne({email:req.userObj.email}, { timeslot:slotTiming, day:dayInt, booked:true});
        resObj.booked = true;
        resObj.message = `Congrats! You have booked the slot ${slotObject.timeslot}`;
    }
    res.json(JSON.stringify(resObj));
})

router.get('/getslotinfo', cookieJWTAuth, (req, res) => {
    if (req.userObj.booked) {
        const resObj = {
            timeslot: req.userObj.timeslot,
            day: req.userObj.day
        };
        res.json(JSON.stringify(resObj));
    }
})

module.exports = router;