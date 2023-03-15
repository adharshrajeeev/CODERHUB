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
        ref:"users"
    },
    image:{
        type:String,
        required:false
    },
    comments:[{
        content:{
            type:String
        },
        postUserId:{
            type:mongoose.Types.ObjectId
        }
    }],
   

},{timestamps:true})

const Posts=mongoose.model('Posts',PostSchema)

export default Posts;