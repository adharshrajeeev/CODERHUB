import { ADMINLOGIN } from "../utils/ConstUrls";
import { adminInstance } from "../utils/axios";


export const adminLogin = async(body)=>{
    try{
        const response=await adminInstance.post(ADMINLOGIN,body);
        return response.data
    }catch(err){
        throw err
    }
}