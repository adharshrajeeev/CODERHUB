import Messages from "../model/messages.js"

export const addNewMessage = async(body)=>{
    try{
        const newMessage=new Messages(body);
        const savedMessage = await newMessage.save();
        return {data:savedMessage}
    }catch(err){
        console.log(err.message)
        throw new Error(err.message)
    }
}

export const fetchAllMessages =  async(conversationId)=>{
    try{
        const messages=await Messages.find({conversationId:conversationId});
        return {data:messages}
    }catch(err){
        console.log(err.message)
        throw new Error(err.message)
    }
}