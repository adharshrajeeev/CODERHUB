import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { adminLoginValidate } from "../middlewares/validation.js"
import Admin from "../model/admin.js";
import User from '../model/users.js';
import Posts from '../model/posts.js'

export const adminLogin = async(req,res)=>{

     try{
          console.log(req.body)
          const {error}=adminLoginValidate(req.body)
     
          if(error) return res.status(200).json({success:false,message:error.details[0].message})

          const {adminId,adminPassword}=req.body;
          const adminDetails=await Admin.findOne({adminId})
          if(adminDetails){
              
               const matchPassword = await bcrypt.compare(adminPassword,adminDetails.adminPassword)
            
               if(!matchPassword) return res.status(200).json({success:false,message:"Admin Password is not matched"})
      
               const adminToken=jwt.sign({id:adminDetails._id},process.env.ADMIN_JWTKEY)
               res.status(200).json({success:true,message:"Login success",adminToken})
          }else{
              
               res.status(200).json({success:false,message:"admin credentials not found"})
          }
          
     }catch(err){
          res.status(400).json({error:err,message:"server eroor"})
     }

}


export const getAllUsers = async (req,res)=>{
     try{
            
          // if(!req.admin) return res.status(401).json({message:"No Authentication"})
          const users= await User.find();
          // if(!users){
          //      return   res.status(200).json({message:"no users found"}) 
          // }
          res.status(200).json(users)
          

     }catch(err){
          res.status(400).json({error:err})
     }
}


export const changeUserStatus = async (req,res)=>{
     try{
          const {userId,userStatus}=req.query;
          if(userStatus==='block'){
               
             const updatedUser = await User.findOneAndUpdate({_id:userId}, {isBlocked:true}, {new:true})
               res.status(200).json({message:"User blocked successfully", user: updatedUser})
          } else {
             
               const updatedUser = await User.findOneAndUpdate({_id:userId}, {isBlocked:false}, {new:true})
               res.status(200).json({message:"User unblocked successfully", user: updatedUser})
          }
     } catch(err){
          res.status(400).json({error: err.message})
     }
}


export const getAlluserPosts =  async(req,res)=>{
     try{
         
          const posts=await Posts.find();
          res.status(200).json(posts)

     }catch(err){
          
          res.status(500).json({success:false,error:err})
     }
}


export const getAllReportedPost = async(req,res)=>{
     try{
         
          const posts=await Posts.find({ reports: { $exists: true, $not: { $size: 0 } } });
          res.status(200).json(posts)

     }catch(err){
          
          res.status(500).json({success:false,error:err})
     }
}


export const changePostStatus= async(req,res)=>{
     const {postId,postStatus}=req.query;
     console.log(postId,postStatus)
     try{
          if(postStatus==='block'){
               const post=  await Posts.findOneAndUpdate({_id:postId},{
                      isBlocked:true
                 })
                 return res.status(200).json({message:"Post blocked successfully"})
            }else{
                 const post=  await Posts.findOneAndUpdate({_id:postId},{
                      isBlocked:false
                 })
                 return res.status(200).json({message:"Post UnBlocked successfully"})
            }
     }catch(err){
          res.status(400).json({error: err.message})
     }
    
}


export const deleteUserPosts = async(req,res)=>{
     try{
          if(!req.admin) return res.status(401).json({message:"No Authentication"})
          const postId=req.params.id;
          Posts.findOneAndUpdate({_id:postId},{
               $set:{
                    isDelete:true
               }
          }).then(()=>{
               return res.status(200).json({success:true,message:"User Post Deleted"})
          }).catch((err)=>{
               return res.status(400).json({success:false,error:err})
          })
          
     }catch(err){
          res.status(500).json({success:false,error:err})
     }
}

export const getMonthWiseUserGrowth = async(req,res)=>{
     try{
          const users=await User.aggregate([
               {
                    $group: {
                      _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                      },
                      count: { $sum: 1 }
                    }
                  },
                  {
                    $sort: { "_id.month": 1 }
                  },
                  {
                    $project: {
                      _id: 0,
                      month: {
                        $let: {
                          vars: {
                            monthsInYear: [
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December"
                            ]
                          },
                          in: {
                            $arrayElemAt: [
                              "$$monthsInYear",
                              { $subtract: [ "$_id.month", 1 ] }
                            ]
                          }
                        }
                      },
                      count: 1
                    }
                  }
          ])
          console.log(users,"users")
          res.status(200).json(users)
     }catch(err){
          console.log(err)
          res.status(200).json({message:err})
     }
}