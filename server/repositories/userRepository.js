import User from "../model/users.js";


export const fetchAllUsers = async () => {
    try {

        const users = await User.find().select('-password')
        return { data: users }

    } catch (err) {
        
        return { error: err.message };
    }
}

export const blockUser = async (userId) =>{
    try{
        const updatedUser=await User.findOneAndUpdate({_id:userId}, {isBlocked:true}, {new:true}).select('-password')
        return {data:updatedUser}
    }catch(err){
        return { error: err.message };
    }
}

export const unBlockUser = async (userId)=>{
    try{
        const updatedUser=await User.findOneAndUpdate({_id:userId}, {isBlocked:false}, {new:true}).select('-password')
        return {data:updatedUser}
    }catch(err){
        return { error: err.message };
    }
}


export const fetchMonthWiseUserGrowth = async()=>{
    try{
        const users = await User.aggregate([
            {
              $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 }
              }
            },
            {
                 $sort: {
                   _id: 1
                 }
               }
          ])
        return {data:users}  
    }catch(err){
        throw new Error(err.message);
    }
}


export const fetchUserById = async(userId)=>{
    try{
        const userdetails= await User.findById(userId);
        return {data:userdetails}
    }catch(err){
        console.log(err.message)
        throw new Error(err.message)
    }
}

export const updateUserDetailsById = async(userId,body)=>{
    try{
        const {userName,gender,phoneNumber,userBio}=body;
        const updatedData=await User.findOneAndUpdate({_id:userId},{
            $set:{
                userName,
                gender,
                phoneNumber,
                userBio
            }
        },{new:true})
        
        return {data:updatedData}

    }catch(err){
        console.log(err.message)
        throw new Error(err.message)
    }
} 


export const fetchAllUserCount = async()=>{
    try{
        const count=await User.countDocuments();
        return {count:count}
    }catch(err){
        console.log(err)
        throw new Error(err.message)
    }
}

export const fetchAllUsersPageNation = async(skip,size)=>{
    try{
        const data=await User.find().skip(skip).limit(size);
        return {data:data}
    }catch(err){
        console.log(err)
        throw new Error(err.message)
    }
}