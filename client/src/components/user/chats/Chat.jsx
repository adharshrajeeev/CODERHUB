import React,{useState,useEffect, useRef, useId} from 'react'
import ChatUsers from './ChatUsers';
import Conversation from './Conversation';
import { Box, Stack } from '@mui/material';
import axios from '../../../utils/axios'
import { ADD_NEW_CONVERSATION, GET_ALL_CONVERSATIONS, GET_USER_MESSAGES, SEND_NEW_MESSAGE } from '../../../utils/ConstUrls'
import  decodeToken from '../../../utils/Services'
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader'
import {io} from 'socket.io-client'
import { GET_FOLLOWING_LIST } from '../../../utils/ConstUrls';

function Chat() {
  const uid=useId();
  const [conversations,setConversations]=useState([]) 
  const [currentChat,setCurrentChat]=useState(null);
  const [messages,setMessages]=useState([])
  const [newMessage,setNewMessage]=useState("");
  const [arrivalMessage,setArrivalMessage]=useState(null);
  const [onlineUsers,setOnlineUsers]=useState([]);
  const [friends,setFriends]=useState([])
  const socket=useRef();
  const scrollRef=useRef()
  const userId=decodeToken();
  const token=localStorage.getItem('token');


useEffect(()=>{
  socket.current=io("ws://localhost:7000")
  socket.current.on("getMessage",(data)=>{
     setArrivalMessage({
      sender:data.senderId,
      text:data.text
     }) 
  })
},[]);


useEffect(()=>{
  arrivalMessage && currentChat?.members?.includes(arrivalMessage?.sender) &&
  setMessages((prev)=>[...prev,arrivalMessage])
},[arrivalMessage,currentChat])




 useEffect(()=>{
  socket.current.emit("addUser",userId)
  socket.current.on("getUsers",(users)=>{
    setOnlineUsers(users)
  });



 },[userId]) 
  

  const getConversations = async()=>{
      try{
        const res = await  axios.get(`${GET_ALL_CONVERSATIONS}/${userId}`,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } })
        setConversations(res.data);
      }catch(err){
        console.log(err)
      }
    }
    
    
    const getFriends=async()=>{
      try{
        
       const recentChat=  conversations[0]?.members;
   
      
    const res=await axios.get(`${GET_FOLLOWING_LIST}/${userId}`,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } })
    
    setFriends(res.data)
  }catch(Err){
    console.log(Err)
  }
}
  useEffect(()=>{
      getConversations();
      getFriends();
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
    if(conversations.length===0){
      const body={
        senderId:userId,
        receiverId:currentChat._id
      }
      try{

        const res=await  axios.post(ADD_NEW_CONVERSATION,body,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } });
       const newConversationId=res.data.savedConversation._id;
      // const receiverId=currentChat.members.find((member)=>member!== userId)
      const message={
        sender:userId,
        text:newMessage,
        conversationId:newConversationId
      }
      try{
  
  
        socket.current.emit("sendMessage",{
          senderId:userId,
          receiverId:currentChat._id,
          text:newMessage
        });
   
  
        const res=await axios.post(SEND_NEW_MESSAGE,message,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" } })
        setMessages([...messages,res.data])
        setNewMessage("")
      }catch(err){
        console.log(err)
      }
      }catch(err){
        console.log(err)
      }

    }else{

      const message={
        sender:userId,
        text:newMessage,
        conversationId:currentChat._id
      }
  
      const receiverId=currentChat?.members?.find((member)=>member!== userId)
  
      try{
  
  
        socket.current.emit("sendMessage",{
          senderId:userId,
          receiverId,
          text:newMessage
        });
  
  
        const res=await axios.post(SEND_NEW_MESSAGE,message,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" } })
        setMessages([...messages,res.data])
        setNewMessage("")
      }catch(err){
        console.log(err)
      }
    }
  }



  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])
  
  
  return (
      <Box >
      <Stack direction='row' sx={{ width:"100%",height:"100%" }}>
        <ChatUsers conversations={conversations} userId={userId} key={`${uid}`} setCurrentChat={setCurrentChat} friends={friends}/>
        <div style={{width:"100%"}} >
          {/* <ChatHeader/> */}
          {
            currentChat ? 
           
            <>
              <ChatHeader currentChat={currentChat} userId={userId} token={token}/>
            {
              messages?.map((m,index)=>
              (
                  <div ref={scrollRef}>
                     
                    <Conversation  messages={m} key={`${index}+${uid}`} own={m.sender===userId}/>
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