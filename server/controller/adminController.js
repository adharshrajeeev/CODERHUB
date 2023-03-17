import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { adminLoginValidate } from "../middlewares/validation.js"
import Admin from "../model/admin.js";
import User from '../model/users.js';

export const adminLogin = async(req,res)=>{

     try{

          const {error}=adminLoginValidate(req.body)
     
          if(error) return res.status(400).json({error:error.details[0].message})

          const {adminId,adminPassword}=req.body;
          const adminDetails=await Admin.findOne({adminId})
          if(adminDetails){
              
               const matchPassword = await bcrypt.compare(adminPassword,adminDetails.adminPassword)
            
               if(!matchPassword) return res.status(400).json({error:"Admin Password is not matched"})
      
               const adminToken=jwt.sign({id:adminDetails._id},process.env.ADMIN_JWTKEY)
               res.status(200).json({adminToken})
          }else{
              
               res.status(400).json({error:"admin credentials not found"})
          }
          
     }catch(err){
          res.status(400).json({error:err})
     }

}


export const getAllUsers = async (req,res)=>{
     try{

          const users=await User.find();
          if(!users){
               return   res.status(200).json({message:"no users found"}) 
          }
          
          res.status(200).json(users)
          

     }catch(err){
          res.status(400).json({error:err})
     }
}


export const changeUserStatus = async (req,res)=>{
     try{

          const users=await User.findOneAndUpdate({_id:req.params.id},{
               isBlocked:false
          })

          res.status(200).json({message:"user updated Sucessfully",users})



     }catch(err){
          res.status(400).json({error:err})
     }
}