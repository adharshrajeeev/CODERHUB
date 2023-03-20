import jwt from "jsonwebtoken";

export const adminVerification = (req,res,next)=>{
    try{

        let adminAuthHeader=req.header("Authorization")
   
    
        if(!adminAuthHeader)  return res.status(403).json({error:"Access Denied"});
  
        let adminToken = adminAuthHeader.split(" ").pop();

        jwt.verify(adminToken,process.env.ADMIN_JWTKEY,(err,decoded)=>{
            if(err){
                return res.status(500).json({error:"Authentication failed"})
            }
            req.admin=true;
            next();
        })
        
    }catch(err){
        res.status(500).json({error:err})
    }
}