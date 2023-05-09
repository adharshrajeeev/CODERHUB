import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next)=>{
    try{
        let authHeader=req.header("Authorization");
      
        if(!authHeader){
            
            return res.status(403).json({error:"Access Denied"});
        }
        let token = authHeader.split(" ").pop();
        jwt.verify(token,process.env.JWT_SECETKEY,(err,decoded)=>{
        if(err){
            
            return res.status(401).json({message:"Authentication failed",authfalse:true})
        }else{
           
            req.token=token;
            next();
        }
    })

    }catch(err){
        res.status(500).json({error:err})
    }
}

