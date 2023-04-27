import Conversation from '../model/conversation.js'


export const addConversation=async(req,res)=>{
    try{
        console.log(req.body)
        const newConversation=new Conversation({
            members:[req.body.senderId,req.body.receiverId]
        })

        const savedConversation=await newConversation.save();

        res.status(200).json({message:"added succesfuully",savedConversation})
    }catch(err){
        res.status(404).json({message:err})
    }
}
 
export const getAllConversation=async(req,res)=>{
    try{
        const conversation=await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(conversation)
    }catch(err){
        res.status(404).json({message:err})
    }
}