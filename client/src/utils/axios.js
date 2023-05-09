import axios from 'axios'
import { baseAdminUrl, baseUserUrl } from './ConstUrls';
import toast from 'react-hot-toast'


const noAdminAuthRoutes=['/admin']

const instance=axios.create({
    baseURL:baseUserUrl
})

const adminInstance=axios.create({
    baseURL:baseAdminUrl
})

instance.interceptors.response.use((response)=>{
      return response;
    
},
(error) => {
    
    if(error?.response?.data?.userBlocked){
        localStorage.removeItem('token')
    }else if(error.message === 'Network Error' && !error.response){
      return  toast.error("NETWORK ERROR - Make Sure Api is Running")
    }else if(error?.response?.data.authfalse){
        localStorage.removeItem('token');
         window.location.href='/'
    }
    else{
        return Promise.reject(error)
    }
   
  
})

adminInstance.interceptors.request.use((config)=>{
    const adminToken=localStorage.getItem('adminToken')
    if(adminToken){
        config.headers.Authorization=`Bearer ${adminToken}`
    }
    return config
},(error)=>{
    return Promise.reject(error);
})

export default instance 
export {adminInstance} 