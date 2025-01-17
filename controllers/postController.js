//importing

const Post = require('../models/postModel');

exports.createPost = async(req,res) => {
    
    try{

        const {title,body}= req.body;
        const post = new Post({
            title,body,
        });
        
        const savedPost = await post.save();

        res.json({
            post:savedPost,
        });

    }
    catch(err){
        return res.status(400).json({
            error:"error while creating the post"
        })
    }
};

//need some more testing after adding likes wala controller

exports.getAllPosts = async(req,res) => {
     
    try{
        const posts = await Post.find().populate("comments").exec();
        res.json({
            posts,
        })
    }
    catch(error)
    {
        return res.status(400).json({
            error:"error while creating the post",
        })
    }
}
