const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const parser = require("body-parser");
const mainRouter = require("./routes/index");
const homeRouter = require("./routes/home");
const path = require('path');

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true}, () => {
    console.log("Connected to DB");
});

app.use(express.static(__dirname + "/static"));
app.use(parser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(mainRouter);

app.use("/home", homeRouter);

app.listen(process.env.PORT || 3000);