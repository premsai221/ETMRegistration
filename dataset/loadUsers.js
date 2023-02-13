const User = require("../models/User");

const users = [
    {
        email:"test1@test.com",
        timeslot:"",
        day:0,
        booked:false
    },
    {
        email:"test2@test.com",
        timeslot:"",
        day:0,
        booked:false
    },
    {
        email:"test3@test.com",
        timeslot:"",
        day:0,
        booked:false
    },
    {
        email:"test4@test.com",
        timeslot:"",
        day:0,
        booked:false
    },
    {
        email:"test5@test.com",
        timeslot:"",
        day:0,
        booked:false
    },
    {
        email:"test6@test.com",
        timeslot:"",
        day:0,
        booked:false
    },
    {
        email:"test7@test.com",
        timeslot:"",
        day:0,
        booked:false
    },
    {
        email:"test8@test.com",
        timeslot:"",
        day:0,
        booked:false
    },
    {
        email:"test9@test.com",
        timeslot:"",
        day:0,
        booked:false
    },
    {
        email:"test10@test.com",
        timeslot:"",
        day:0,
        booked:false
    },
];

async function loadUserData() {
    if ((await User.find()).length === 0){
        try{
            await User.insertMany(users);
            console.log("Inserted users");
        }
        catch(error) {
            console.log("Could not insert users");
        }
    }
}

module.exports = loadUserData;