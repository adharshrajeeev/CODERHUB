import cloudinary from '../config/cloudinary.js';
import Posts from '../model/posts.js';
import User from '../model/users.js';



export const addUserPosts = async (req, res) => {
    try{
        const {content,userId}=req.body
      
        if(req.file){

            const cloudImage=await cloudinary.uploader.upload(req.file.path,{
                folder:"Posts"
            });
            console.log(cloudImage)
            const post = await Posts.create({
                content,
                postedUser:userId,
                image:{
                    PublicId:cloudImage.public_id,
                    url:cloudImage.url
                }
            })
            return res.status(200).json(post)
        }
        const post=await Posts.create({
            content,
            postedUser:userId
        })
        res.status(200).json({message:"sucess post added",post})
    }catch(err){
        res.status(400).json({success:false,error:err})
    }
}


export const getUserPost = async(req,res)=>{
    try{
        const userId=req.params.id;
        const userPosts = await Posts.find({postedUser:userId})
        res.status(200).json(userPosts)
    }catch(err){
        res.status(400).json({success:false,error:err})
    }
    
}

export const getEditPost=async(req,res)=>{
    try{
        const userPost=await Posts.findById(req.params.id)
        res.status(200).json({success:true,userPost})
    }catch(err){
        res.status(500).json({success:false,error:err})
    }
}


export const updateUserPost= async(req,res)=>{
    try{
        const postId=req.params.id
        const {content}=req.body;

        if(req.file){
            const cloudImage=await cloudinary.uploader.upload(req.file.path,{
                folder:"Posts"
            });
            const UpdatePost=await Posts.findOneAndUpdate({_id:postId},{
                $set:{
                    "image.url":cloudImage.url,
                    content:content
                }
            })
            return res.status(200).json({success:true,UpdatePost})
        }
        const UpdatePost=await Posts.findOneAndUpdate({_id:postId},{
            $set:{
                content:content
            }
        })
         res.status(200).json({success:true,UpdatePost})

    }catch(err){
        res.status(500).json({success:false,error:err})
    }
}

export const getAllPosts = async(req,res)=>{
    try{
       
        const userId=req.params.id
        const user=await User.findOne({_id:userId})
        const followingIds= user.following.map(follower =>follower._id )
        const userPosts=await Posts.find({postedUser:{$in:followingIds}})

        res.status(200).json(userPosts)
    }catch(err){
        res.status(500).json({error:err})
    }
}