import User from "../model/users.js";


export const fetchAllUsers = async () => {
    try {

        const users = await User.find()
        return { data: users }

    } catch (err) {
        
        return { error: err.message };
    }
}

export const blockUser = async (userId) =>{
    try{
        const updatedUser=await User.findOneAndUpdate({_id:userId}, {isBlocked:true}, {new:true})
        return {data:updatedUser}
    }catch(err){
        return { error: err.message };
    }
}

export const unBlockUser = async (userId)=>{
    try{
        const updatedUser=await User.findOneAndUpdate({_id:userId}, {isBlocked:false}, {new:true})
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