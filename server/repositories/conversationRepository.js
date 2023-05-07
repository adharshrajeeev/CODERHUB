import Conversation from "../model/conversation.js"

export const addNewConversation = async(senderId,receiverId)=>{
    try{
         const newConversation=new Conversation({
            members:[senderId,receiverId]
        })
        const savedConversation=await newConversation.save();
        return {data:savedConversation}
    }catch(err){
        console.log(err)
        throw new Error(err.message)
    }
}

export const fetchAllConversations = async (userId) =>{
    try{
          const conversation=await Conversation.find({members:{$in:[userId]}})
            return {data:conversation}
    }catch(err){
        console.log(err)
        throw new Error(err.members)
    }
}