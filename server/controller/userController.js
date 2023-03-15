import bcrypt from 'bcrypt'
import signupValidate from '../middlewares/validation.js';
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

   }
};