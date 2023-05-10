'use Strict'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cloudinary from '../config/cloudinary.js';
import { signupValidate, userLoginValidate } from '../middlewares/validation.js';
import nodemailer  from 'nodemailer'
import User from '../model/users.js';
import Posts from '../model/posts.js';
import Mailgen from 'mailgen'; 
import dotenv from 'dotenv'
import { fetchAllUsers, fetchUserById, updateUserDetailsById } from '../repositories/userRepository.js';
dotenv.config();

export const registerUser = async (req,res)=>{
   try{
    
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
               dateOfBirth,gender,
               profilePic:"https://res.cloudinary.com/dusueqzzk/image/upload/v1683175773/istockphoto-1337144146-612x612_rnhtjp.jpg"
            })
            res.status(200).json({success:true,message:"success new user created",user:newUser})
         }
      }
   }catch(err){

         res.status(500).json({error:err})
   }
};



export const verificationAndSignup= async(req,res)=>{
   try{
      const {email,password,userName,phoneNumber,dateOfBirth,gender}=req.body;
      console.log(req.body);

      let randomOtp= Math.floor(Math.random() * 90000) + 10000
      let config={
         service:'gmail',
         auth:{
            user:'adharshrajeeev2000@gmail.com',
            pass:process.env.NODEMAILERPASS
         }
      }

      let transporter=nodemailer.createTransport(config)

      let mailGenerator=new Mailgen({
         theme:"default",
         product:{
            name:"CODERHUB",
            link:"https://mailgen.js/"
         }
      })

      let response={
         body:{
            name:email,
            intro:"We received a request to verifiy mail for  your CODERHUB Account.",
            outro:`Enter ${randomOtp} to complete the reset.`
         }
      }

      let mail=mailGenerator.generate(response);

      let message={ 
         from:'adharshrajeeev2000@gmail.com',
         to:"adharshrajeeev2000@gmail.com",
         subject:"Email Verification",
         html:mail
      }
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
            dateOfBirth,gender,
            profilePic:"https://res.cloudinary.com/dusueqzzk/image/upload/v1683175773/istockphoto-1337144146-612x612_rnhtjp.jpg",
            mailOtp:randomOtp
            })
            console.log(newUser,"new User created")
            transporter.sendMail(message).then((response)=>{
             return  res.status(200).json({
                  message:"U have received a mail", 
                  userId:newUser._id
               })
            }).catch((err)=>{
               console.log(err)
               return res.status(400).json({message:"Error in Database"})
            }) 
        
      }



   }catch(err){
      console.log(err)
      res.status(500).json({message:"Ops Something Went wrong in otp"})
   }
}


export const otpSignupVerification = async(req,res)=>{
   try{
      const {OTP,userId}=req.body;
      console.log(req.body)
      const user=await User.findOne({_id:userId})
      console.log(user)
      if(user){
         if(OTP==user.mailOtp){
            return res.status(200).json({message:"Signup Sucess"})
         }else{

            return res.status(400).json({message:"Otp not matched"})
         }
      }else{
         res.status(401).json({message:"mail is not valid"})
      }
   }catch(Err){
      console.log(Err)
      res.status(400).json({message:"Ops Server error"})
   }
}

export const userLogin = async(req,res)=>{
   try{
      const {error}=userLoginValidate(req.body);
      if(error){
         res.status(400).json({success:false,message:error.details[0].message})
      }else{
         const {email,password}=req.body;
         const userdetails=await User.findOne({email});
         if(userdetails){
            if(userdetails.isBlocked) return res.status(403).json({message:" Sorry, your account has been blocked."})
            const passMatch=await bcrypt.compare(password,userdetails.password);
            if(!passMatch) return res.status(400).json({success:false,message:"User Password is Invalid"})
            
            const token=jwt.sign({id:userdetails._id},process.env.JWT_SECETKEY);
            res.status(200).json({success:true,message:"Login success",token,userdetails})
         }else{
            res.status(400).json({success:false,message:"User not found"})
         }
      }
   }catch(err){
      console.log(err)
      res.status(400).json({error:err})
   }

}


export const getAllUsers = async(req,res)=>{
      try{

         const {data}=await fetchAllUsers();
         res.status(200).json(data)

      }catch(err){
         res.status(400).json({error:err.message}) 
      }  
}


export const getUsers=async(req,res)=>{
   try{
      const {data} = await fetchUserById(req.params.userId)
      res.status(200).json(data)
   }catch(Err){
      res.status(500).json({error:Err.message,message:"Failed to fetch User Details"})
   }
}


export const getUserDetails = async (req,res)=>{
   try{  
         
         const {data} = await fetchUserById(req.params.id)
         res.status(200).json({userdetails:data})
   }catch(err){
     
      res.status(400).json({error:err.message,message:"oops suggestion user server error"})
   }
}





export const updateUserDetals =async(req,res)=>{
 
      try{   
         const {data}=await updateUserDetailsById(req.params.id,req.body)
         res.status(200).json(data)
      }catch(err){
         res.status(401).json({message:"Ops Something went wrong"})
      }

}

export const getUserProfileInfo = async (req,res)=>{
   try{
    
         const {personId,userId}=req.query;
   

         const userData=await User.findById(personId);
         
         const posts=await Posts.find({$and:[{"postedUser._id":personId},{"reports.userId":{$ne:userId}}]}).sort({ createdAt: -1 });
         const isFollowing=await User.findOne({following:{$in:personId}});
         if(isFollowing) return res.status(200).json({userData,posts,isFollowing:true})

         res.status(200).json({userData,posts,isFollowing:false});
   }catch(err){
      res.status(500).json({error:err,message:"oops suggestion user server error"})
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
      const {userId,followingId}=req.body;
      const user=await User.findById(userId)
      const followers=await User.findById(followingId)

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


export const removeFollower= async(req,res)=>{
   try{
      const {userId,followerId}=req.body
      User.updateOne({_id:followerId},{
         $pull:{
            following:userId
         }
      }).then(async(response)=>{
         await User.updateOne({_id:userId},{
            $pull:{
               followers:followerId
            }
         })
         return  res.status(200).json({success:true,message:`Success Removed user`})
      }).catch((err)=>{
         res.status(400).json({error:err})
      })
   }catch(err){
      res.status(400).json({error:err})
   }
}

export const addUserBio=async(req,res)=>{
   
   try{
   //    const {error}=userBioValidation(req.body.bio)
   // if(error) return res.status(500).json({error:error.details[0].message})

   const {userId,Bio}= req.body;
      
 User.findOneAndUpdate({_id:userId},
      { $set:{
         userBio:Bio
      }
      }).then((response)=>{

         res.status(200).json({message:"bio updated sucessfully"})
      })


   
   }catch(err){
      res.status(400).json({message:err})
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


export const addCoverPicture = async (req,res)=>{
   try{
      const userId=req.params.id;
      if(!req.file) return res.status(201).json({success:false,message:"no image found"})

      const coverPic = await cloudinary.uploader.upload(req.file.path,{
         folder:"Cover"
      });

      const coverUrl=coverPic.url;
      User.findOneAndUpdate({_id:userId},{
         coverPic:coverUrl
      }).then(async(response)=>{
         const user=await User.findOne({_id:userId});
      res.status(200).json({success:true,message:"User Cover Pictured Added",coverUrl})

      }).catch((err)=>{
      res.status(401).json({message:"oops something whent wrong"})

      })
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
      if(!req.file) return res.status(400).json({success:false,error:"No Image Found",message:"No Image Found"})

      const profilePic=await cloudinary.uploader.upload(req.file.path,{
         folder:"Profile"
      })

      const imageUrl=profilePic.url
      const userPropic=await User.findOneAndUpdate({_id:userId},{
         profilePic:imageUrl
      })
      res.status(200).json({success:true,message:"User Profile picture updated",imageUrl})

   } catch (err) {
      res.status(500).json({success:false,error:err,message:"Error in Updating Profile Picture"})
   }
}


export const getAllConnections=async(req,res)=>{
   try{
      const user=await User.findOne({_id:req.params.id});
      const following=user.following.map(following=>following._id);
      
      let connections=await User.find({$and:[{_id:{$nin:user.following}},{_id:{$ne:req.params.id}}]})
      res.status(200).json(connections)
   }catch(err){
      res.status(500).json({success:false,error:"oops somethig went wrong in connections",message:"Failed to fetch users"})
   }
}
 
export const getAllFollowings = async(req,res)=>{
   try{
      const user=await User.findById(req.params.id);
      const following = await user.following.map(following=>following._id);
      let followings = await  User.find({_id:{$in:following}});

      res.status(200).json(followings)
   }catch(err){
      res.status(500).json({success:false,error:err.message,message:"Failed to fetch Followings"})
   }
   
}

export const getAllFollowers = async (req,res)=>{
   try{
         const user=await User.findById(req.params.id);
         const followers=await user.followers.map(followers => followers._id);
         let followersList=await User.find({_id:{$in:followers}});
         res.status(200).json(followersList)
   }catch(err){
      res.status(500).json({success:false,error:err.message,message:"Failed to fetch Followers"})
   }
}


export const changeUserPassword = async (req,res)=>{
   try{
      const {userId,currentPassword, newPassword,
         confirmPassoword} = req.body;
         const userData=await User.findOne({_id:userId})
         if(userData){

            const passMatch=await bcrypt.compare(currentPassword,userData.password)
            if(!passMatch) return res.status(401).json({message:"Current Password Not Matched"})
            
            const hashedPassword=await bcrypt.hash(newPassword,10)
            User.findOneAndUpdate({_id:userId},{
               $set:{
                  password:hashedPassword
               }
            }).then((response)=>{
               return res.status(200).json({message:"Password changed Successfully"})
            }).catch((err)=>{
              return res.status(401).json({message:"user Not Find"})
            })
         }else{

            res.status(400).json({message:"Ops User Not found"})  
         }
      
   }catch(err){
      res.status(500).json({success:false,error:"oops somethig went wrong in follwing"})

   }
}



export const sendOtpToMail = async (req,res)=>{
   try{
      const {email}=req.body
      let randomOtp= Math.floor(Math.random() * 90000) + 10000
      let config={
         service:'gmail',
         auth:{
            user:'adharshrajeeev2000@gmail.com',
            pass:process.env.NODEMAILERPASS
         }
      }

      let transporter=nodemailer.createTransport(config)

      let mailGenerator=new Mailgen({
         theme:"default",
         product:{
            name:"CODERHUB",
            link:"https://mailgen.js/"
         }
      })

      let response={
         body:{
            name:email,
            intro:"We received a request to reset the password on your CODERHUB Account.",
            outro:`Enter ${randomOtp} to complete the reset.`
         }
      }

      let mail=mailGenerator.generate(response);

      let message={ 
         from:'adharshrajeeev2000@gmail.com',
         to:"adharshrajeeev2000@gmail.com",
         subject:"Reset Password",
         html:mail
      }
     const user=await User.findOne({email})
     if(user){

        transporter.sendMail(message).then(()=>{
           User.findOneAndUpdate({email:email},{
              $set:{
                 mailOtp:randomOtp
              }
           }).then((response)=>{
           return res.status(200).json({
              message:"U have received a mail",
              userId:user._id
           })
           }).catch((err)=>{
              console.log(err)
              return res.status(400).json({message:"Ops errir in database"})
           })
  
        }).catch((err)=>{
           console.log(err)
           return res.status(400).json({message:"error in sending mail"})
        })
     }else{
     return res.status(401).json({message:"User Not Registered"})
     }
   }catch(err){
      console.log(err)
      res.status(500).json({message:"Ops Something Went wrong in otp"})

   }
}

export const resetAndConfrimOtp = async(req,res)=>{
   try{
      const {userId,OTP,newPassword}=req.body;
      console.log(req.body)
      const hashedPassword=await bcrypt.hash(newPassword,10)
      User.findOne({_id:userId}).then((response)=>{
         if(response.mailOtp==OTP){
            User.updateOne({_id:response._id},{
               password:hashedPassword
            }).then((response)=>{
               
               return  res.status(200).json({message:"Password reset Successfully"})
            }).catch((err)=>{
               return res.status(400).json({message:err})
            })
         }else{
            res.status(401).json({message:"Otp not matched"})
         }
      })
         
   }catch(err){
      res.status(500).json({message:"Ops Server Error "})

   }
}


export const searchUserFollowing = async(req,res)=>{
   try{
      const {userId,userName}=req.query;
 
      const user=await User.findById(userId);
      // const following = await user.following.map(following=>following._id);
      const users=await User.find({
         "$or": [
             {
                 userName: { $regex: userName }
             }, 
             {
                 email: { $regex: userName }
             } 
         ] 
     })
   //   const searchedUsers=users.map((user)=>user._id)
     if(users.length==0) {return res.status(400).json({message:"No Users"})}
     else return  res.status(200).json(users)
   }catch(err){
      res.status(400).json({message:"Search Folowing error",error:err})
   }
}


export const searchAllUsers = async(req,res)=>{
   try{
      const {userSearchName}=req.query;

      const users=await User.find({
         "$or": [
             {
                 userName: { $regex: userSearchName }
             }, 
             {
                 email: { $regex: userSearchName }
             } 
         ] 
     })
     res.status(200).json(users)
   }catch(Err){
      console.log(Err)
      res.status(400).json({message:"Search Folowing error",error:Err})
   }
}