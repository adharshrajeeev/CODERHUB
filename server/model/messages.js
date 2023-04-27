import mongoose from "mongoose";

const MessageSchema= mongoose.Schema({
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    }

},{timestamps:true})

const Messages =  mongoose.model('Messages',MessageSchema);

export default Messages