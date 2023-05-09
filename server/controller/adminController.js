import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { adminLoginValidate } from "../middlewares/validation.js"
import Admin from "../model/admin.js";
import { blockUser, fetchAllUsers, fetchMonthWiseUserGrowth, unBlockUser } from '../repositories/userRepository.js';
import { blockPosts, fetchAllPosts, fetchMonthWisePostGrowth, fetchPostDetails, fetchTotalPostReports, unBlockPosts } from '../repositories/postRepository.js';

export const adminLogin = async(req,res)=>{

     try{
          console.log(req.body)
          const {error}=adminLoginValidate(req.body)
     
          if(error) return res.status(401).json({success:false,message:error.details[0].message})

          const {adminId,adminPassword}=req.body;
          const adminDetails=await Admin.findOne({adminId})
          if(adminDetails){
              
               const matchPassword = await bcrypt.compare(adminPassword,adminDetails.adminPassword)
            
               if(!matchPassword) return res.status(401).json({success:false,message:"Admin Password is not matched"})
      
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
          const {data}= await fetchAllUsers()
          res.status(200).json(data)
     
     }catch(err){
          console.error(err);
          res.status(400).json({message:'Failed to fetch Users'})
     }
}


export const changeUserStatus = async (req,res)=>{
     try{
          const {userId,userStatus}=req.query;
          if(userStatus==='block'){
               const {data}=await blockUser(userId);
               res.status(200).json({message:"User blocked successfully", user: data})
          } else {
          
               const {data}=await unBlockUser(userId);
               res.status(200).json({message:"User unblocked successfully", user: data})
          }
     } catch(err){
          res.status(400).json({error:err.message})
     }
}


export const getAlluserPosts =  async(req,res)=>{
     try{
         

          const {data}=await fetchAllPosts();
          res.status(200).json(data)

     }catch(err){
         
          res.status(500).json({success:false,error:err,message:"Failed to fetch Posts"})
     }
}


export const getAllReportedPost = async(req,res)=>{
     try{
         
          const {data}=await fetchTotalPostReports()  
          res.status(200).json(data)
        
     }catch(err){
          
          res.status(500).json({success:false,error:err,message:"Failed to fetch reported post"})
     }
}


export const changePostStatus= async(req,res)=>{
     const {postId,postStatus}=req.query;
   
     try{
          if(postStatus==='block'){
              await  blockPosts(postId)
                 return res.status(200).json({message:"Post blocked successfully"})
            }else{
              await unBlockPosts(postId)
                 return res.status(200).json({message:"Post UnBlocked successfully"})
            }
     }catch(err){
          res.status(400).json({error: err.message,message:"Failed to change post Status"})
     }
    
}




export const getMonthWiseUserGrowth = async(req,res)=>{
     try{

               const {data}=await fetchMonthWiseUserGrowth()
             res.status(200).json(data);
     }catch(err){
         
          res.status(200).json({message:"Failed to fetch user growth",error:err.message})
     }
}


export const getMothWisePostCount = async(req,res)=>{
     try{
          const {data} = await fetchMonthWisePostGrowth()   
             res.status(200).json(data);
     }catch(err){
          console.log(err)
          res.status(200).json({message:err})
     }
}


export const getPostDetails= async(req,res)=>{
     try{
          const {data} = await fetchPostDetails(req.params.postId);
          res.status(200).json(data);
     }catch(err){
          console.log(err)
          res.status(200).json({message:err.message})
     }
}