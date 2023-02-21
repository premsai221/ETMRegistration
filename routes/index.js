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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let resObj = {
        validUser: false
    };
    if (userObj) {
        resObj.validUser = true;
        // const randOTP = crypto.randomInt(100000, 1000000);
        const userPwd = userObj.password;
        const token = await jwt.sign({ password: userPwd }, process.env.TOKEN_SECRET, { expiresIn: process.env.OTP_TOKEN_EXPIRE });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            hidden:true
            // signed: true
        });
    }
    return res.json(JSON.stringify(resObj))
})

router.post('/verifypwd', async function (req, res) {
    const token = req.cookies.token;
    const userPWD = req.body.pwd;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        var realPWD = await jwt.verify(token, process.env.TOKEN_SECRET).password;
    }
    catch (error) {
        return res.redirect("/");
    }
    var resObj = {
        validPWD:false
    }
    if (userPWD === realPWD) {
            const userEmailObj = {
                email: req.body.email
            }
            const token = await jwt.sign(userEmailObj, process.env.TOKEN_SECRET, { expiresIn: process.env.LOGIN_TOKEN_EXPIRE });
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                hidden:true
                // signed: true
            });
            resObj.validPWD = true;

    }
    return res.json(JSON.stringify(resObj))

})

module.exports = router;