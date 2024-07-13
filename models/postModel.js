//import mongoose
const mongoose = require('mongoose');


//route handler
const postSchema = new mongoose.Schema({
    title:{
         type:String,            //kisi aur model se refer kar rahe hai Id ko
         required: true,         // reference to the post model
    },
    body:{
        type:String,
        required:true,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }]

});


//export
module.exports = mongoose.model("Post",postSchema);