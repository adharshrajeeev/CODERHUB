import { addNewConversation, fetchAllConversations } from '../repositories/conversationRepository.js';



export const addConversation = async (req, res) => {
    try {

        const { data } = await addNewConversation(req.body.senderId, req.body.receiverId)
        res.status(200).json({ message: "added succesfuully", savedConversation: data })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getAllConversation = async (req, res) => {
    try {
        const { data } = await fetchAllConversations(req.params.userId)
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err })
    }
}