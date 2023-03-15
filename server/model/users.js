const mongoose=require('mongoose');

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
        required:true
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

module.exports = mongoose.model('USERS', UserSchema);