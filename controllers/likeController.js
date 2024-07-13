//import models

const Post = require("../models/postModel");
const Like = require("../models/likeModel");
const{response} = require("express");

//like a post

exports.likePost = async(req,res)=>{
try{
    const {post,user} = req.body;
    const like = new Like({
        post,user,
    });
    const savedLike = await like.save();

    //update post collection on the basis of this

    const updatedPost = await Post.findByIdAndUpdate(post,
                                                    {$push:{likes:savedLike._id}}, 
                                                    {new:true });

    res.json({
        post:updatedPost,
    });

}
catch(err){
    return res.status(500).json({
        error:"error while liking the post",
    });

}
};

//unlike a post

exports.unlikePost = async(req,res)=>{

    try{

        //need to delete like for both the like model and post model
        const{post,like} = req.body;
        
        //find and delete from like collection
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});

        //update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true});

        res.json({
            post:updatedPost,
        });

    }
    catch(err){
        return res.status(500).json({
            error:"error while unliking the post",
        });
    }

};






exports.dummyLink = (req,res) => {
    res.send("This is dummy link");
}