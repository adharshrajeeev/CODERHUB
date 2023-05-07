import { addNewMessage, fetchAllMessages } from '../repositories/messageRepository.js';

export const postMessage = async(req,res)=>{
    try{
        const {data}=await addNewMessage(req.body)
        res.status(200).json(data)
    }catch(err){
         console.log(err.message)
        res.status(400).json(err.message)
    }
}

export const getAllMessgaes=async(req,res)=>{
    try{
        const {data} = await fetchAllMessages(req.params.conversationId)
        res.status(200).json(data)
    }catch(err){
        console.log(err.message)
        res.status(500).json(err.message)

    }
}