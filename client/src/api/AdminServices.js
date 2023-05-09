import { ADMINLOGIN, GET_ALL_POSTS, GET_ALL_USERS } from "../utils/ConstUrls";
import { adminInstance } from "../utils/axios";


export const adminLogin = async(body)=>{
    try{
        const response=await adminInstance.post(ADMINLOGIN,body);
        return response.data
    }catch(err){
        throw err
    }
}

export const fetchAllUsers=async()=>{
    try{
        const response=await adminInstance.get(GET_ALL_USERS);
        return response.data
    }catch(err){
        throw err
    }
}

export const fetchAllPosts=async()=>{
    try{
        const response=await adminInstance.get(GET_ALL_POSTS)
        return response.data
    }catch(err){
        throw err
    }
}