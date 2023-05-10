import store from '../redux/store'
import { ADD_COMMENTS, ADD_COVERPICTURE, ADD_PROFILEIMAGE, ALL_POSTS, CHANGE_NOTIFICATION_STATUS, DELETE_COMMENT, DELETE_NOTIFICATION, DELETE_POSTS, EMAIL_VERIFICATION_SIGNUP, EXPLORE_ALLPOST, FOLLOW_USER, GET_ALL_NOTIFICATIONS, GET_CONNECTIONS, GET_FOLLOWERS_LIST, GET_FOLLOWING_LIST, GET_PROFILE_DETAILS, GET_USER_DETAILS, LIKE_POST, OTP_AND_RESET_PASS, REMOVE_FOLLOWER, SEND_OTP_REQUEST, 
    SHOW_USER_POST, UNFOLLOW_USER, UNLIKE_POST, USER_LOGIN } from '../utils/ConstUrls'
import { setLogin } from '../redux/userSlice';
import axios from '../utils/axios';

import jwt_decode from 'jwt-decode';
import instance from '../utils/axios';


export const fetchUserDetails = async()=>{
    try{
    
        var token=localStorage.getItem('token');
        var decode=jwt_decode(token);
    }catch(err){
        console.log("decode error",err)
    }
    
    try{
        
        
        axios.get(`${GET_USER_DETAILS}/${decode.id}`,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", } }).then((response)=>{
            store.dispatch(setLogin({
                user:response.data.userdetails,
                token:token
            }))
            
        }).catch((err)=>{
            
            console.log("error is fdetch actahc",err)
        })
       

       
    }catch(err){
        console.log("decode error",err)
    }
   
} 

export const userLogin = async(body)=>{
    try{
      const response=await  instance.post(USER_LOGIN,body)
      return response
    }catch(err){
        throw err
    }
}


export const userRegister =async(body)=>{
    try{
        const response=await instance.post(EMAIL_VERIFICATION_SIGNUP,body)
        return response
    }catch(err){
        throw err
    }
}

export const sendOtpRequest =async(body)=>{
    try{
        const response=await instance.post(SEND_OTP_REQUEST,body)
        return response
    }catch(err){
        throw err
    }
}

export const fetchAllConnections = async (userId)=>{
    try{
        const response = await instance.get(`${GET_CONNECTIONS}/${userId}`)
        return response
    }catch(err){
        throw err
    }
}


export const fetchAllFollowers = async (userId)=>{
    try{
        const response = await instance.get(`${GET_FOLLOWERS_LIST}/${userId}`)
        return response
    }catch(err){
        throw err
    }
}


export const fetchAllFollowings = async (userId)=>{
    try{
        const response = await instance.get(`${GET_FOLLOWING_LIST}/${userId}`)
        return response
    }catch(err){
        throw err
    }
}

export const fetchUserPosts = async (userId) =>{
    try{
        const response = await instance.get(`${SHOW_USER_POST}/${userId}`)
        return response
    }catch(err){
        throw err
    }
}

export const addUserCoverPhoto = async (userId,file)=>{
    try{
        const response = await instance.post(`${ADD_COVERPICTURE}/${userId}`,file)
        return response
    }catch(err){
        throw err
    }
}


export const addUserProfileImage = async (userId,file) =>{
    try{
        const response = await instance.post(`${ADD_PROFILEIMAGE}/${userId}`,file)
        return response
    }catch(err){
        throw err
    }
} 

export const fetchOtherUserDetails =  async (personId,userId)=>{
    try{
        const response = await instance.get(`${GET_PROFILE_DETAILS}?personId=${personId}&userId=${userId}`)
        return response
    }catch(err){
        throw err
    }
}


export const followUser = async (body) =>{
    try{
        const response = await instance.post(FOLLOW_USER,body)
        return response
    }catch(err){
        throw err
    }
}


export const unFollowUser = async (body) =>{
    try{
        const response = await instance.post(UNFOLLOW_USER,body)
        return response
    }catch(err){
        throw err
    }
}

export const removeFollower = async(body)=> {
    try{
        const response = instance.post(REMOVE_FOLLOWER,body)
        return response
    }catch(err){
        throw err
    }
}


export const addNewComment =async(body)=>{
    try{
        const response = await instance.post(ADD_COMMENTS,body);
        return response
    }catch(err){
        throw err
    }
}


export const deleteComment = async (body)=>{
    try{
        const response = await instance.put(DELETE_COMMENT,body)
        return response
    }catch(err){
        throw err
    }
}

export const fetchExplorePosts = async (userId,page)=>{
    try{
        const response = await instance.get(`${EXPLORE_ALLPOST}?userId=${userId}&page=${page}`)
        return response
    }catch(err){
        throw err
    }
}

export const sendOtpandResetPassword = async (body)=>{
    try{
        const response = await instance.post(OTP_AND_RESET_PASS,body)
        return response
    }catch(err){
        throw err
    }
}

export const fetchAllNotifications = async (userId)=>{
    try{
        const response = await instance.get(`${GET_ALL_NOTIFICATIONS}/${userId}`)
        return response
    }catch(err){
        throw err
    }
}

export const changeNotificationStatus = async (notificationId)=>{
    try{
        const response = await instance.put(`${CHANGE_NOTIFICATION_STATUS}/${notificationId}`)
        return response
    }catch(err){
        throw err
    }
}

export const deleteUserNotification = async (notificationId)=>{
    try{
        const response =await instance.delete(`${DELETE_NOTIFICATION}/${notificationId}`);
        return response
    }catch(err){
        throw err
    }
}


export const toggleLikePost = async (body)=>{
    try{
        const response = instance.put(LIKE_POST,body)
        return response
    }catch(err){
        throw err
    }
}


export const toggleUnLikePost = async (body)=>{
    try{
        const response = instance.put(UNLIKE_POST,body)
        return response
    }catch(err){
        throw err
    }
}

export const deleteUserPost = async (postId,userId)=>{
    try{
        const response = await instance.delete(`${DELETE_POSTS}?postId=${postId}&userId=${userId}`)
        return response
    }catch(err){
        throw err
    }
}


export const fetchUserFriendsPosts = async (userId)=>{
    try{
        const response = await instance.get(`${ALL_POSTS}/${userId}`)
        return response
    }catch(err){    
        throw err
    }
}