import store from '../redux/store'
import { EMAIL_VERIFICATION_SIGNUP, GET_CONNECTIONS, GET_USER_DETAILS, SEND_OTP_REQUEST, USER_LOGIN } from '../utils/ConstUrls'
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