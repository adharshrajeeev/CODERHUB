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
    bio:{
        type:String,
       
    },
    followers:[
        {
            type:String
        }
    ],
    following:[
        {
            type:String
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
    }

})

const User = mongoose.model('USERS', UserSchema);
export default User