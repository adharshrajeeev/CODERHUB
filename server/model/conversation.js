import mongoose from "mongoose";

const ConvesationSchema= mongoose.Schema({
    members:{
        type:Array
    }
   
},{timestamps:true})

const Conversation =  mongoose.model('Conversation',ConvesationSchema);

export default Conversation