'use Strict'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cloudinary from '../config/cloudinary.js';
import { signupValidate, userLoginValidate } from '../middlewares/validation.js';

import User from '../model/users.js';



export const registerUser = async (req,res)=>{
   try{
      // console.log(req.body)
      const {error}= signupValidate(req.body)
      if(error){
         res.status(200).json({success:false,message:error.details[0].message})
      }else{
         
         const {email,password,userName,phoneNumber,dateOfBirth,gender}=req.body
         const userdetails=await User.findOne({ email});
         if(userdetails){
            res.status(200).json({success:false,message:"User already Registered"})
         }else{
            const hashedpassword=await bcrypt.hash(password,10);
            const newUser= await User.create({
               userName,
               email,
               password:hashedpassword,
               phoneNumber,
               dateOfBirth,gender

            })
            res.status(200).json({success:true,message:"success new user created",user:newUser})
         }
      }
   }catch(err){

         res.status(500).json({error:err})
   }
};


export const userLogin = async(req,res)=>{
   try{
      const {error}=userLoginValidate(req.body);
      if(error){
         res.status(201).json({success:false,message:error.details[0].message})
      }else{
         const {email,password}=req.body;
         const userdetails=await User.findOne({email});
         if(userdetails){
            const passMatch=await bcrypt.compare(password,userdetails.password);
            if(!passMatch) return res.status(200).json({success:false,message:"User Password is Invalid"})
            
            const token=jwt.sign({id:userdetails._id},process.env.JWT_SECETKEY);
            res.status(200).json({success:true,token,userdetails})
         }else{
            res.status(200).json({success:false,message:"User not found"})
         }
      }
   }catch(err){
      res.status(400).json({error:err})
   }

}


export const getAllUsers = async(req,res)=>{
      try{

         const users = await User.find().limit(5)
         res.status(200).json(users)

      }catch(err){
         res.status(400).json({error:err})
      } 
}


export const getUserDetails = async (req,res)=>{
   try{  
         
         const userdetails=await User.findById(req.params.id);
         
         res.status(200).json({userdetails})
   }catch(err){
      res.status(400).json({error:err,message:"oops suggestion user server error"})
   }
}


export const getUserSuggestion = async (req,res)=>{ /// needed to complete 
   try{
         const userId=req.params.id
         const user=await User.findById(userId);
         const allUsers=await User.find({_id:{$ne:userId}}).limit(5)
         const following=user.following.map((userFollowing)=>userFollowing._id); 
         if(following) return res.status(201).json(allUsers)

         const friendSuggestions=await User.find({following:{$nin:following}}); 
         console.log(friendSuggestions,"please frinds")
         res.status(200).json(friendSuggestions)
         

   }catch(err){
      res.status(400).json({error:err,message:"oops suggestion user server error"})
   }
}



export const followUser= async (req,res)=>{
   try{
     const {userId,followerId}=req.body;
     
     const user=await User.findById(userId);
     const followers=await User.findById(followerId)

     if(!followers || !user) return res.status(400).json({success:true,message:"follower not found"})
     
      User.updateOne({_id:user._id},{
         $addToSet:{
            following:followers._id
         }
      }).then(async(response)=>{
         console.log(response)
         if(response.modifiedCount === 0) return res.status(200).json({success:false,message:`You already following`})
        const followed = await User.updateOne({_id:followers._id},{
            $addToSet:{
               followers:user._id
            }
         })
          return  res.status(200).json({message:`Success you started Following  ${followers.userName}`})
      })

      
   }catch(err){
      res.status(400).json({error:err})
   }
}


export const unFollowUser = async (req,res)=>{
   try{
      const {userId,followerId}=req.body;
      const user=await User.findById(userId)
      const followers=await User.findById(followerId)

       if(!followers || !user) return res.status(200).json({success:false,message:"follower not found"})

       User.updateOne({_id:user._id},{
         $pull:{
            following:followers._id
         }
       }).then(async(response)=>{
            await User.updateOne({_id:followers._id},{
               $pull:{
                  followers:user._id
               }
            })
             return  res.status(200).json({success:true,message:`Success Unfollowed user ${followers.userName}`})
       })
   }catch(err){
      res.status(400).json({error:err})
   }
}


export const addUserBio=async(req,res)=>{
   
   try{
   //    const {error}=userBioValidation(req.body.bio)
   // if(error) return res.status(500).json({error:error.details[0].message})

   const {userId,bio}= req.body;
   console.log(userId,bio)
   const user=await User.findOneAndUpdate({_id:userId},
      {
         userBio:bio
      });

      res.status(200).json({message:"bio updated sucessfully"})

   
   }catch(err){
      res.status(400).json({error:err})
   }
   
}


export const getUserBio = async (req,res)=>{
   try{
      let {userBio}=await User.findById(req.params.id);
      if(userBio){

         return res.status(200).json({success:true,userBio})
      }
      res.status(200).json({success:true,userBio:null})
   }catch(err){
      res.status(500).json({sucess:false,error:err})
   }
}


export const uptadeUserBio = async(req,res)=>{
   try{
      const {userBio}= req.body;
      const bio= await User.findOneAndUpdate({_id:req.params.id},{
         userBio:userBio
      })
      res.status(200).json({success:true,bio})
   }catch(err){
      res.status(500).json({success:false,error:err})
   }
}

export const addProfilePicture = async(req,res)=>{
   try{
   
      const userId=req.params.id
     
      if(!req.file) return res.status(201).json({success:false,message:"no image found"})
      console.log(req.file)
      const profilePic=await cloudinary.uploader.upload(req.file.path,{
         folder:"Profile"
      })
      const imageUrl=profilePic.url
      const userPropic=await User.findOneAndUpdate({_id:userId},{
         profilePic:imageUrl
      })
      res.status(200).json({success:true,message:"User Profile picture updated",imageUrl})

   }catch(err){
      res.status(500).json({message:"oops something whent wrong"})
   }
}


export const getUserProfilePic = async (req,res)=>{
   try{
      const userId=req.params.id;
      const user=await User.findById(userId)
      res.status(200).json({success:true,profilePic:user.profilePic})

   }catch(err){
      res.status(500).json({success:false,error:err})
   }
}


export const UpdateUserPicture = async (req,res)=>{
   try {
      
      const userId=req.params.id;
      if(!req.file) return res.status(400).json({success:false,error:"No Image Found"})

      const profilePic=await cloudinary.uploader.upload(req.file.path,{
         folder:"Profile"
      })

      const imageUrl=profilePic.url
      const userPropic=await User.findOneAndUpdate({_id:userId},{
         profilePic:imageUrl
      })
      res.status(200).json({success:true,message:"User Profile picture updated",imageUrl})

   } catch (err) {
      res.status(500).json({success:false,error:err})
   }
}