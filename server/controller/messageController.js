import Messages from '../model/messages.js'

export const postMessage = async(req,res)=>{
    try{
        const newMessage=new Messages(req.body);
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)
    }catch(err){
      console.log(err)
        res.status(500).json(err)
    }
}

export const getAllMessgaes=async(req,res)=>{
    try{
        const messages=await Messages.find({
            conversationId:req.params.conversationId
        });
        res.status(200).json(messages)
    }catch(err){
        res.status(500).json(err)

    }
}