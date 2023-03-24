import mongoose from "mongoose";

const PostSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }],
    postedUser:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    },
    userName:{
        type:String,
    },
    image:{
        url:String
    },
    comments:[{
        content:{
            type:String
        },
        postUserId:{
            type:mongoose.Types.ObjectId
        }
    }],
    isDelete:{
        type:Boolean,
        default:false
    }
   

},{timestamps:true})

const Posts=mongoose.model('Posts',PostSchema)

export default Posts;