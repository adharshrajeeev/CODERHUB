import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    userBio:{
        type:String,
       
    },
    followers:[
        {
         
            type:mongoose.Types.ObjectId,
             ref:"users"
        
        }
    ],
    following:[
        {
         
             type:mongoose.Types.ObjectId,
              ref:"users"
           
         }
    ],
    coverPic:{
        type:String
    },
    profilePic:{
        type:String
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    mailOtp:{
        type:String
    }

},{timestamps:true})

const User = mongoose.model('User', UserSchema);
export default User