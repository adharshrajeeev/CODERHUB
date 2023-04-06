
import cloudinary from '../config/cloudinary.js';
import Posts from '../model/posts.js';
import User from '../model/users.js';



export const addUserPosts = async (req, res) => {
    console.log("here111e")
    try{
        const {content,userId,userName,profilePic}=req.body
        console.log("heree")
        // console.log(userName)
        if(req.file){
            const cloudImage=await cloudinary.uploader.upload(req.file.path,{
                folder:"Posts"
            });
            console.log(cloudImage)
           await Posts.create({
                content,
                postedUser:{
                    _id:userId,
                    userName,
                    profilePic
                },
                image:{
                    PublicId:cloudImage.public_id,
                    url:cloudImage.url
                },
                userName:userName
            })
            const posts=await Posts.find().sort({ createdAt: -1 });
            return res.status(200).json({success:true,message:"post added sucess",posts})
        }
        await Posts.create({
            content,
            postedUser:{
                _id:userId,
                userName:userName,
                profilePic:profilePic
            },
        })
        const posts=await Posts.find().sort({ createdAt: -1 });
        res.status(200).json({success:true,message:"sucess post added",posts})
    }catch(err){
        console.log(err)
        res.status(400).json({success:false,error:err,message:"somehting went wrong"})
    }
}


export const getUserPost = async(req,res)=>{
    try{
        const userId=req.params.id;
        const posts = await Posts.find({"postedUser._id":userId}).sort({ createdAt: -1 });
        res.status(200).json({success:true,posts})
    }catch(err){
        res.status(400).json({success:false,error:err})
    }
    
}

export const getEditPost=async(req,res)=>{
    try{
        const postDetails=await Posts.findById(req.params.id)
        res.status(200).json({success:true,postDetails})
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
        const followingIds= user.following.map(follower =>follower._id );
        const userPosts=await Posts.find({"postedUser._id":{$in:followingIds}}).sort({ createdAt: -1 });
        res.status(200).json(userPosts)
    }catch(err){
        res.status(500).json({error:err})
    }
}


export const deleteUserPost = async(req,res)=>{
    try{
       
        const postId=req.params.id;
     
        Posts.findByIdAndDelete(postId).then(async()=>{
            const posts=await Posts.find().sort({ createdAt: -1 });
            return res.status(200).json({success:true,message:"Post Deleted Success Fully",posts});

        }).catch((err)=>{
            return res.status(401).json({success:false,message:"No post found",error:err})
        })

    }catch(err){
        res.status(500).json({error:err})
    }
}

export const exploreAllPosts = async(req,res)=>{
    try{
        const posts=await Posts.find().sort({ createdAt: -1 });
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json({error:err})
    }
}

export const likePost=async(req,res)=>{
    try{
        
        const {postId,userId}=req.body;
        console.log(postId,userId,"hey all this is liekd")
        return new Promise((resolve,reject)=>{
            Posts.findOneAndUpdate({_id:postId},{
                $addToSet:{
                    likes:userId
                }
            }).then((response)=>{
                resolve(res.status(200).json({message:"user liked post",response}))
            }).catch((err)=>{
                resolve(err)
            }) 
        })
    }catch(err){
        res.status(500).json({error:err})

    }
} 

export const unLikePost=async(req,res)=>{
    try{
        
        const {postId,userId}=req.body;
        console.log(postId,userId,"no issue")
        const post=await Posts.findOneAndUpdate({_id:postId},{
            $pull:{
                likes:userId
            }
        })
        res.status(200).json({success:true,message:"user unliked post",post})
    }catch(err){
      
        res.status(500).json({error:err})

    }
}


export const getLikedPostCount=async(req,res)=>{
    try{
        const postId=req.params.id;
        console.log(postId)
       const {likes}=await Posts.findOne({_id:postId})
        res.status(200).json(likes.length)

    }catch(err){
        res.status(500).json({error:err})
    }
}


export const addPostComment = async(req,res)=>{
    try{
   
        const commentDate=new Date();
        const {postId,userId,content}=req.body;
        const userDetails=await User.findOne({_id:userId})
        const newComment={
            postUserId:userId,
            content:content,
            createdAt:commentDate,
            userName:userDetails.userName,
            userPic:userDetails.profilePic
        }
      await Posts.findOneAndUpdate({_id:postId},{
            $push:{
                comments:newComment,
            },
        })
        const post=await Posts.findOne({_id:postId})
        res.status(200).json(post)
    }catch(err){
        res.status(500).json({error:err})
    }
}

