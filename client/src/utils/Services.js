import jwtDecode from "jwt-decode";



export default function decodeToken(){
    try{
        const token=localStorage.getItem('token');
        if(!token) return window.location.href('http://localhost:3000');
        const {id}=jwtDecode(token);
        return id
        
    }catch(err){
        return  window.location.href('http://localhost:3000');
    }
}


const adminToken=localStorage.getItem('adminToken');




export const adminConfig={
    headers:{
        Authorization:`Bearer ${adminToken}`,
    }
}
