import { ADMINLOGIN, CHANGE_POST_STATUS, CHANGE_USER_STATUS, GET_ALL_POSTS, GET_ALL_USERS, GET_ALL_USER_PAGENATION, GET_POST_DETAILS, GET_REPORTED_POSTS, POST_MONTH_WISE_COUNT, 
        USER_MONTH_WISE_GROWTH } from "../utils/ConstUrls";
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

export const changeUserStatus =async (userId,status)=>{
    try{
        const response=await adminInstance.put(`${CHANGE_USER_STATUS}?userId=${userId}&userStatus=${status}`)
        return response
    }catch(err){
        throw err
    }
}

export const fetchAllPostReportedWise = async ()=>{
    try{
        const response=await adminInstance.get(GET_REPORTED_POSTS);
        return response
    }catch(err){
        throw err
    }
}

export const changePostStatus =async (postId,status)=>{
    try{
        const response=await adminInstance.put(`${CHANGE_POST_STATUS}?postId=${postId}&postStatus=${status}`)
        return response
    }catch(err){
        throw err
    }
}

export const fetchPostDetailsById = async(postId)=>{
    try{
        const response=await adminInstance.get(`${GET_POST_DETAILS}/${postId}`);
        return response
    }catch(err){  
        throw err
    }
}

export const fetchAllUsersPageNation = async(activePage,LIMIT)=>{
    try{
        const response=await adminInstance.get(GET_ALL_USER_PAGENATION,{params:{
            page:activePage,
            size:LIMIT
        }})
        return response
    }catch(err){
        throw err
    }
}