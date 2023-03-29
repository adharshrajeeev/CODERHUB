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