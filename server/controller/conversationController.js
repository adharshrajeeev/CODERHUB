import Conversation from '../model/conversation.js'
import User from '../model/users.js';


export const addConversation=async(req,res)=>{
    try{
       
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
        // const membersIds = [];
        console.log(conversation,"converssations")
        // conversation.forEach((item) => {
        //     item.members.forEach((memberId) => {
        //       if (memberId !== req.params.userId) {
        //         membersIds.push(memberId);
        //       }
        //     });
        //   });
        // const userDetails=await User.find({_id:{$in:membersIds}})
        // res.status(200).json({userDetails,conversation})
        res.status(200).json(conversation)
    }catch(err){
        console.log(err)
        res.status(404).json({message:err})
    }
}