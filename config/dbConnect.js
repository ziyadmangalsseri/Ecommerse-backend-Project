const dotenv = require('dotenv').config()
const mongoose = require("mongoose");
const dbConnect = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("database connected successfully");

        
    }catch (error){
        console.log("database error");
        
    }
}

module.exports = dbConnect;      