import store from '../redux/store'
import { GET_USER_DETAILS } from '../utils/ConstUrls'
import { setLogin } from '../redux/userSlice';
import axios from '../utils/axios';
import jwt_decode from 'jwt-decode';


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


