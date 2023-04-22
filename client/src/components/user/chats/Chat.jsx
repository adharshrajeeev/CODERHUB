import React,{useState,useEffect, useRef} from 'react'
import ChatUsers from './ChatUsers';
import Conversation from './Conversation';
import { Box, Stack } from '@mui/material';
import axios from '../../../utils/axios'
import { GET_ALL_CONVERSATIONS, GET_USER_MESSAGES, SEND_NEW_MESSAGE } from '../../../utils/ConstUrls'
import  decodeToken from '../../../utils/Services'
import ChatFooter from './ChatFooter';

function Chat() {
  const [conversations,setConversations]=useState([]) 
  const [currentChat,setCurrentChat]=useState(null);
  const [messages,setMessages]=useState([])
  const [newMessage,setNewMessage]=useState("");
  const scrollRef=useRef()
  const userId=decodeToken();
  const token=localStorage.getItem('token');

  const getConversations = async()=>{
      try{
        const res = await  axios.get(`${GET_ALL_CONVERSATIONS}/${userId}`,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } })
        setConversations(res.data);
      
      }catch(err){
          console.log(err)
      }
  }
  useEffect(()=>{
      getConversations()
  },[])


  useEffect(()=>{
    const getMessages = async()=>{
      try{
        const res=await axios.get(`${GET_USER_MESSAGES}/${currentChat?._id}`,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } })
        setMessages(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getMessages();
  },[currentChat]);


  const handleMessageSend = async(e)=>{
    e.preventDefault();
    const message={
      sender:userId,
      text:newMessage,
      conversationId:currentChat._id
    }
    try{
      const res=await axios.post(SEND_NEW_MESSAGE,message,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } })
      setMessages([...messages,res.data])
      setNewMessage("")
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  return (
      <Box >
      <Stack direction='row' sx={{ width:"100%",height:"100%" }}>
        <ChatUsers conversations={conversations} userId={userId} setCurrentChat={setCurrentChat} />
        <div style={{width:"100%"}} >
          {/* <ChatHeader/> */}
          {
            currentChat ? 
           
            <>
              {/* <ChatHeader/> */}
            {
              messages?.map((m,index)=>
              (
                  <div ref={scrollRef}>

                    <Conversation  messages={m} key={index} own={m.sender===userId}/>
                  </div>
                )
            )
            }
            <ChatFooter newMessage={newMessage} setNewMessage={setNewMessage} handleMessageSend={handleMessageSend} />
            </> 
           
            :
             <Box sx={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}} >
              <Stack  alignItems={"center"}
                    justifyContent="space-between" >
              <span>"Open  A Conversation"</span>
              </Stack>
            </Box> 
          }
        
        </div>
        {/* <Box sx={{height:"100%", width:"100vh", backgroundColor:"black"}}>
        </Box> */}
      </Stack>
      </Box>
  )
}

export default Chat