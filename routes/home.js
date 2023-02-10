const express = require("express");
// const { cookieJWTAuth, socketJWTAuth } = require("../middlewares/cookieJWTAuth");
const User = require("../models/User");
const Slot = require("../models/Slot");
const jwt =  require("jsonwebtoken");
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();

const router = express.Router();

router.get('/',async function (req, res) {
    console.log(await jwt.verify(req.cookies.token, process.env.TOKEN_SECRET));
    console.log('hello');
    res.sendFile(path.join(__dirname, "..", "views", "main.html"));
});

router.get('/getslots',async function (req, res) {
    var slotData = await Slot.find();
    var slotObj = {slots:{...slotData}};
    return res.json(JSON.stringify(slotObj))
})

module.exports = router;