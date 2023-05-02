import mongoose from "mongoose";

const PostSchema=mongoose.Schema({
    content:{
        type:String,
    },
    likes:[{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }],
    postedUser:{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user' 
          },
          userName: {
            type: String,
            required: true
          },
          profilePic: {
            type: String,
            required: true
          }
    },
    image:{
        url:String
    },
    videoUrl:{
        type:String
    },
    comments:[{
        content:{
            type:String
        },
        userId:{
            type:mongoose.Types.ObjectId
        },
        createdAt:{
            type:Date,
        },
        userName:{
            type:String
        },
        userPic:{
            type:String
        }
    }],
    isDelete:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    reports:[{
        content:{
            type:String
        },
        userId:{
            type:mongoose.Types.ObjectId
        },
    }],
    isPrivate:{
        type:Boolean,
        default:false
    },

},{timestamps:true})

const Posts=mongoose.model('Posts',PostSchema)

export default Posts;