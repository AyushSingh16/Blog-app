const mongoose = require("mongoose");

require("dotenv").config();         //loads contents of env file to process

const connectWithDB = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(()=>{
        console.log("DB connected successfully");
    })
    .catch((error)=>{
        console.log(error);
        console.error(error.message);
        process.exit(1);
    });
}

module.exports = connectWithDB;