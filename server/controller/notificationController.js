import { changeNotificationReadStatus, deleteNotification, fetchAllNotifications } from "../repositories/notificationRepository.js"



export const getAllNotifications = async(req,res)=>{
    try{

        const {userId}=req.params
        const {data}=await fetchAllNotifications(userId)
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({ error: err.message })

    }

}


export const readNotification =async(req,res)=>{
    try{
        const {notificationId}=req.params
        const {data}=await changeNotificationReadStatus(notificationId);
        res.status(200).json(data)
    }catch(err){
        console.log(err.message)
        res.status(500).json({ error: err.message })
    }
}


export const deteletUserNotification = async (req,res) =>{
    try{
        const {notificationId}=req.params
        const {data}=await deleteNotification(notificationId);
        res.status(200).json(data)
    }catch(err){
        console.log(err.message)
        res.status(500).json({ error: err.message })
    }
}