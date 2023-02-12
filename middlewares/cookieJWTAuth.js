const jwt =  require("jsonwebtoken");
const User = require("../models/User");

const cookieJWTAuth = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        const {email} = await jwt.verify(token, process.env.TOKEN_SECRET);
        const userObj = await User.findOne({email:email});
        if (userObj){
            req.userObj = userObj;
            next();
        }
        else {
            res.redirect("/");
        }
    }
    catch (e){
        res.redirect("/");
    }
}

module.exports = cookieJWTAuth;