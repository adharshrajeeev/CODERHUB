import bcrypt from 'bcrypt'


export const hashPassword = async(password,salt)=>{
    try{
        const response=await bcrypt.hash(password,salt)
        return {data:response}
    }catch(err){
        throw err
    }
}

export const comparePassword =async(password,newPassword)=>{
    try{
        const response=await bcrypt.compare(password,newPassword)
        return {data:response}

    }catch(err){
        throw err
    }
}