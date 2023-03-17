'use Strict'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { signupValidate, userBioValidation, userLoginValidate } from '../middlewares/validation.js';

import User from '../model/users.js';



export const registerUser = async (req,res)=>{
   try{
      const {error}= signupValidate(req.body)
      if(error){
         res.status(400).json({error:error.details[0].message})
      }else{
         const {email,password,userName,phoneNumber,dateOfBirth,gender}=req.body
         const userdetails=await User.findOne({ email});
         if(userdetails){
            res.status(403).json({error:"User already Registered"})
         }else{
            const hashedpassword=await bcrypt.hash(password,10);
            const newUser= await User.create({
               userName,
               email,
               password:hashedpassword,
               phoneNumber,
               dateOfBirth,gender

            })
            res.status(200).json({message:"success new user created",user:newUser})
         }
      }
   }catch(err){
         res.status(400).json({error:err})
   }
};


export const userLogin = async(req,res)=>{
   try{
      const {error}=userLoginValidate(req.body);
      if(error){
         res.status(400).json({error:error.details[0].message})
      }else{
         const {email,password}=req.body;
         const userdetails=await User.findOne({email});
         if(userdetails){
            const passMatch=await bcrypt.compare(password,userdetails.password);
            if(!passMatch) return res.status(400).json({error:"User Password is Invalid"})
            
            const token=jwt.sign({id:userdetails._id},process.env.JWT_SECETKEY);
            res.status(200).json({token,userdetails})
         }else{
            res.status(400).json({error:"User not found"})
         }
      }
   }catch(err){
      res.status(400).json({error:err})
   }

}


export const getAllUsers = async(req,res)=>{
      try{

         const users=await User.find()
         res.status(200).json(users)

      }catch(err){

         res.status(400).json({error:err})
      } 
}



export const followUser= async (req,res)=>{
   try{
     const {userId,followerId}=req.query;
     
     const user=await User.findById(userId);
     const followers=await User.findById(followerId)

     if(!followers || !user) return res.status(400).json({message:"follower not found"})
     
      User.updateOne({_id:user._id},{
         $addToSet:{
            following:followers._id
         }
      }).then(async(response)=>{
         if(response.modifiedCount === 0) return res.status(401).json({message:`You already following`})
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
      const {userId,followerId}=req.query;
      const user=await User.findById(userId)
      const followers=await User.findById(followerId)

       if(!followers || !user) return res.status(400).json({message:"follower not found"})

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
             return  res.status(200).json({message:`Success Unfollowed user ${followers.userName}`})
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