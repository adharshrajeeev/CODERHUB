'use Strict'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cloudinary from '../config/cloudinary.js';
import { signupValidate, userLoginValidate } from '../middlewares/validation.js';
import nodemailer  from 'nodemailer'
import User from '../model/users.js';
import Posts from '../model/posts.js';
import Mailgen from 'mailgen';



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
               profilePic:"https://res.cloudinary.com/dusueqzzk/image/upload/v1681119372/noProfilePicture_j1uj5g.jpg"
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
         if(userdetails.isBlocked) return res.status(403).json({message:" Sorry, your account has been blocked."})
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
         
         const userdetails= await User.findOne({_id:req.params.id});
      
         res.status(200).json({userdetails})
   }catch(err){
     
      res.status(400).json({error:err,message:"oops suggestion user server error"})
   }
}


export const getUserAllData = (req,res)=>{ 
   return new Promise(async(resolve,reject)=>{
      const userData=await User.findOne({_id:req.query.userId});
      res.status(200).json(userData)
   }).catch((err)=>{
      res.status(400).json({error:err,message:"oops suggestion user server error"})
   })
}


export const updateUserDetals =async(req,res)=>{
 
      try{
    
         const newData=await User.findOneAndUpdate({_id:req.params.id},{
            $set:{
               userName:req.body.userName,
               gender:req.body.gender,
               phoneNumber:req.body.phoneNumber
            }
         },{new:true}); 
   res.status(200).json(newData)
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


export const getUserSuggestion = async (req,res)=>{ /// needed to complete 
   try{
         const userId=req.params.id
         const user=await User.findById(userId);
         const allUsers=await User.find({_id:{$ne:userId}}).limit(5)
         const following=user.following.map((userFollowing)=>userFollowing._id); 
         if(following.length === 0) return res.status(201).json(allUsers)

         const friendSuggestions=await User.find({following:{$nin:following}}); 
       
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

   const {userId,bio}= req.body;

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


export const getAllConnections=async(req,res)=>{
   try{
      const user=await User.findOne({_id:req.params.id});
      const following=user.following.map(following=>following._id);
      
      let connections=await User.find({$and:[{_id:{$nin:user.following}},{_id:{$ne:req.params.id}}]})
      res.status(200).json(connections)
   }catch(err){
      res.status(500).json({success:false,error:"oops somethig went wrong in connections"})
   }
}

export const getAllFollowings = async(req,res)=>{
   try{
      const user=await User.findById(req.params.id);
      const following = await user.following.map(following=>following._id);
      let followings = await  User.find({_id:{$in:following}});

      res.status(200).json(followings)
   }catch(err){
      res.status(500).json({success:false,error:"oops somethig went wrong in follwing"})
   }
   
}

export const getAllFollowers = async (req,res)=>{
   try{
         const user=await User.findById(req.params.id);
         const followers=await user.followers.map(followers => followers._id);
         let followersList=await User.find({_id:{$in:followers}});
         res.status(200).json(followersList)
   }catch(err){
      res.status(500).json({success:false,error:"oops somethig went wrong in follwing"})
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
      // let testAccount = await nodemailer.createTestAccount();

      // let transporter = nodemailer.createTransport({
      //    host: "smtp.ethereal.email",
      //    port: 587,
      //    secure: false, // true for 465, false for other ports
      //    auth: {
      //      user: testAccount.user, // generated ethereal user
      //      pass: testAccount.pass, // generated ethereal password
      //    },
      //  });

      //  let message={
      //    from: '"Fred Foo 👻" <foo@example.com>', // sender address
      //    to: "bar@example.com, baz@example.com", // list of receivers
      //    subject: "Hello ✔", // Subject line
      //    text: "Hello world?", // plain text body
      //    html: "<b>Hello world?</b>", // html body
      //  }

      //  transporter.sendMail(message).then(()=>{
      //    return res.status(200).json({message:"You sould receive an otp"})
      //  }).catch((err)=>{
      //    return res.status(401).json({message:err})
      //  })
      const {userEmail,userId}=req.body
      // console.log(req.body);
      // res.status(200).json({message:`Otp has send to mail ${userEmail}`})

      let config={
         service:'gmail',
         auth:{
            user:'adharshrajeeev2000@gmail.com',
            pass:'dzvmmuwojcnlnawy'
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
            name:userEmail,
            intro:"We received a request to reset the password on your CODERHUB Account.",
            outro:`Enter ${12345} to complete the reset.`
         }
      }

      let mail=mailGenerator.generate(response);

      let message={ 
         from:'adharshrajeeev2000@gmail.com',
         to:"adharshrajeeev2000@gmail.com",
         subject:"Reset Password",
         html:mail
      }

      transporter.sendMail(message).then(()=>{
         return res.status(200).json({
            message:"U have received a mail"
         })
      }).catch((err)=>{
         console.log(err)
         return res.status(400).json({message:"error in sending mail"})
      })
   }catch(err){
      res.status(500).json({message:"Ops Something Went wrong in otp"})

   }
}