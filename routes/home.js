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
    const slotid = req.body.slotid;
    var resObj = {
        booked: false,
        message: "Sorry the slot is full"
    }
    const slotObject = await Slot.findOne({slotid:slotid});
    if (slotObject.freeSlots > 0){
        var freeSlots = slotObject.freeSlots - 1;
        await Slot.updateOne({slotid:slotObject.slotid}, {freeSlots: freeSlots});
        await User.updateOne({email:req.userObj.email}, { timeslot:slotObject.timeslot, day:slotObject.day, booked:true});
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

router.get('/logout', cookieJWTAuth, (req, res) => {
    const token = '';
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        hidden:true
        // signed: true
    });
    res.redirect('/');
})

module.exports = router;