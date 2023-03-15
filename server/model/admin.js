import mongoose from "mongoose";

const adminSchema=mongoose.Schema({
    adminId:{
        type:String,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    }
})