const express = require("express");
const app = express();


// loading .env file to process
require("dotenv").config();


//choosing the port number
const PORT = process.env.PORT || 4000;

// adding middlewares
app.use(express.json());

// importing the blog from routes
const blog = require("./routes/blog");

// mount
app.use("/api/v1",blog);

// importing db
const connectWithDB = require("./config/database");
connectWithDB();



//starting the server
app.listen(PORT, () => {
    console.log(`App is started at Port No. ${PORT}`);
})

// default route
app.get('/',(req,res) => {
    res.send("This is homepage");
})