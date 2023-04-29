import axios from 'axios'
import { baseUserUrl } from './ConstUrls';


const instance=axios.create({
    baseURL:baseUserUrl
})

instance.interceptors.response.use((response)=>{
      return response;
    
},
(error) => {
    console.log(error.response.data)
    if(error?.response?.data?.userBlocked){
        localStorage.removeItem('token')
    }
   
  
})

export default instance