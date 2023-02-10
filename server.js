const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const parser = require("body-parser");
const mainRouter = require("./routes/index");
const homeRouter = require("./routes/home");
const path = require('path');
const loadSlotData = require("./dataset/loadSlots")

const app = express();

mongoose.connect("mongodb://localhost:27017/matrixRegTest", {useNewUrlParser: true}, () => {
    console.log("Connected to DB");
});

loadSlotData();

app.use(express.static(__dirname + "/static"));
app.use(parser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(mainRouter);

app.use("/home", homeRouter);

app.listen(3000);