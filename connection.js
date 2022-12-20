
require("dotenv").config();
const mongoose = require("mongoose");
module.exports.connectToDB = connectToDB;


// Connect to Database

function connectToDB() {

    const LOCAL_URL_STRING = "mongodb://127.0.0.1:27017";
    const ONLINE_URL_STRING = "mongodb+srv://admin-richard:636471@cluster0.m61kfnn.mongodb.net"
    mongoose.set("strictQuery", true);

    mongoose.connect(process.env.ONLINE_URL_STRING + "/wikiDB")
        .then((result) =>       console.log("Connected to DB Successfully"))
    .catch ((err) => console.log("There's an error connecting" + err));

  
}