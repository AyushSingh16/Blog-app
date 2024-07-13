//import model

const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//business logic

exports.createComment = async(req,res) => {
    try{
        // fetch data from req body
        const {post,user,body} = req.body;

        //creating an object for comment
        const comment = new Comment({
            post,user,body
        });

        //save the comment on database
        const savedComment = await comment.save();

        //find the post by ID, add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push : {comments: savedComment._id}},{new :true})
        .populate("comments").exec();             //push for update, pull for delete          //new : true for returning the updated doc
                    //populate the comment's array with comment's doc

        res.json({
            post: updatedPost,
        });


    }
    catch(error)
    {
        res.status(500).json({
            error:"Error while creating comment",
        });
    }
}