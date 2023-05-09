import { ADMINLOGIN, GET_ALL_POSTS, GET_ALL_USERS, POST_MONTH_WISE_COUNT, USER_MONTH_WISE_GROWTH } from "../utils/ConstUrls";
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

export const fetchMontWiseUserReport = async ()=>{
    try{
        const response=await adminInstance.get(USER_MONTH_WISE_GROWTH)
        return response
    }catch(err){
        throw err
    }
}

export const fetchMonthWisePostReport = async ()=>{
    try{
        const response=await adminInstance.get(POST_MONTH_WISE_COUNT)
        return response
    }catch(err){
        throw err
    }
}