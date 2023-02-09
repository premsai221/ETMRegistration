const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');

dotenv.config();

const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.post('/checkemail', async function (req, res) {
    const userEmail = req.body.email;
    const userObj = await User.findOne({ email: userEmail });
    console.log(userObj);
    let resObj = {
        validUser: false
    };
    if (userObj) {
        resObj.validUser = true;
    }
    const randOTP = crypto.randomInt(100000, 1000000);
    console.log("Sent OTP: "+randOTP);
    const token = await jwt.sign({ otp: randOTP }, process.env.TOKEN_SECRET, { expiresIn: "5m" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true
        // signed: true
    });
    return res.json(JSON.stringify(resObj))
})

router.post('/verifyotp', async function (req, res) {
    const token = req.cookies.token;
    const userOTP = Number.parseInt(req.body.otp);
    const realOTP = await jwt.verify(token, process.env.TOKEN_SECRET).otp;
    var resObj = {
        validOTP:false
    }
    if (userOTP === realOTP) {
        const userEmailObj = {
            email: req.body.email
        }
        const token = await jwt.sign(userEmailObj, process.env.TOKEN_SECRET, { expiresIn: "30m" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true
            // signed: true
        });
        resObj.validOTP = true;
        console.log("Correct OTP");

    }
    else {
        console.log("Wrong OTP")
    }
    return res.json(JSON.stringify(resObj))

})

module.exports = router;