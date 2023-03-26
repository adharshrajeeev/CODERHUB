import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next)=>{
    try{
        let authHeader=req.header("Authorization");
        console.log(authHeader,"auhtheader")
        if(!authHeader){
           
            return res.status(403).json({error:"Access Denied"});
        }
        let token = authHeader.split(" ").pop();
        jwt.verify(token,process.env.JWT_SECETKEY,(err,decoded)=>{
        if(err){
            return res.status(200).json({message:"Authentication failed"})
        }
        req.decoded=decoded;
        next();
    })

    }catch(err){
        res.status(500).json({error:err})
    }
}