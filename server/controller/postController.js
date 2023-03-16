import cloudinary from '../config/cloudinary.js';
import Posts from '../model/posts.js'



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
        res.status(200).json(post)

     
        res.status(200).json({message:"sucess post added",post})
    }catch(err){
        res.status(400).json({error:err})
    }
}


export const getUserPost= async(req,res)=>{
    try{
        console.log(req.decoded)
    res.send("yes gotcha")
    }catch(err){
        res.status(400).json({error:err})
    }
    
}