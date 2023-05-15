import Admin from "../model/admin.js";

export const fetchAdminDb= async(adminId)=>{
    try{
        const response= await Admin.findOne({adminId})
        if(response){

            return {data:response}
        }else {
            return { data: null, message: "Admin ID not found" };
          }
    }catch(err){
        throw new Error(err.message)
    }
}