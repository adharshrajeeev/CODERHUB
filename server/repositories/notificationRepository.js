import Notification from '../model/notifications.js'


export const addLikeNotification = async(recipientId,senderId,postId,action)=>{
    try{
        console.log(recipientId,senderId,postId,action);
        const notification=new Notification({
            recipientId,
            senderId,
            postId,
            action
        })
        await notification.save();
        return {data:"success"}
    }catch(err){
        console.log(err.message); 
        throw new Error(err.message)
    }
}


export const removeLikeNotification = async(recipientId,senderId,postId,action)=>{
    try{
        await Notification.findOneAndDelete({recipientId,senderId, postId,action})
      return {data:"success"}
    }catch(err){
        console.log(err.message);
        throw new Error(err.message)
    }
}


export const fetchAllNotifications=async(recipientId)=>{
    try{
        const allNotifications= await Notification.find({ recipientId }).populate('senderId', '-password').sort({date:-1});
        return {data:allNotifications}
    }catch(err){
        console.log(err.message);
        throw new Error(err.message)
    }
}


export const changeNotificationReadStatus=async(notificationId)=>{
    try{
        const notification=await Notification.findOneAndUpdate({_id:notificationId},{
            $set:{
                read:true
            }
        },{new:true})
        return {data:notification}
    }catch(err){ 
        console.log(err.message);
        throw new Error(err.message) 
    }
}


export const deleteNotification = async(notificationId)=>{
    try{
        const notification=await Notification.findByIdAndDelete({_id:notificationId})
        return {data:notification}
    }catch(err){ 
        console.log(err.message);
        throw new Error(err.message) 
    }
}