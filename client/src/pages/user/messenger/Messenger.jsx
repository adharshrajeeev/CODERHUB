import React, { useEffect, useRef, useState } from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import './Messenger.css'
import Conversations from '../../../components/user/conversations/Conversations'
import Message from '../../../components/user/conversations/Message'
import ChatOnline from '../../../components/user/conversations/ChatOnline'
import decodeToken from '../../../utils/Services'
import axios from '../../../utils/axios'
import { ADD_NEW_CONVERSATION, GET_ALL_CONVERSATIONS, GET_USER_MESSAGES, SEARCH_USER_FOLLOWINGS, SEND_NEW_MESSAGE } from '../../../utils/ConstUrls'
import {io} from 'socket.io-client'
import { Divider } from '@mui/material'

function Messenger() {



    const userId=decodeToken();
    const token=localStorage.getItem("token")
    const [conversations,setConversations]=useState([]);
    const [currentChat,setCurrentChat]=useState(null);
    const [messages,setMessages]=useState([])
    const [arrivalMessage,setArrivalMessage]=useState(null);
    const [newMessage,setNewMessage]=useState("")
    const [searchUserName,setSearchName]=useState("")
    const [searchedUser,setSearchedUser]=useState(null)
    const [messageErrors,setMessageError]=useState({searchErr:false})
    const socket=useRef();

    const scrollRef=useRef()





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
        //  console.log(users)
        });
      
      
      
       },[userId]) 
        

    const getConversations=async()=>{
        try{

            const res=await axios.get(`${GET_ALL_CONVERSATIONS}/${userId}`,{ headers: { 'Authorization': `Bearer ${token}` } });
            setConversations(res.data)
        }catch(err){    
            console.log(err);
        }
    }

    useEffect(()=>{
        getConversations();
    },[])

   useEffect(()=>{
    const getMessages= async()=>{
     try{  
         const res=await axios.get(`${GET_USER_MESSAGES}/${currentChat?._id}`,{ headers: { 'Authorization': `Bearer ${token}` } });
        setMessages(res?.data)
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
        conversationId:currentChat._id,
        text:newMessage
    }
    try{
        const receiverId=currentChat?.members?.find((member)=>member !== userId);
        socket.current.emit("sendMessage",{
            senderId:userId,
            receiverId:receiverId,
            text:newMessage
          });
        const res=await axios.post(SEND_NEW_MESSAGE,message,{ headers: { 'Authorization': `Bearer ${token}` } });
        setMessages([...messages,res.data])
        setNewMessage("")
    }catch(err){
        console.log(err)
    }
   }


   

   useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])



    const handleSearch =  async()=>{
        try{
           
           axios.get(`${SEARCH_USER_FOLLOWINGS}?userId=${userId}&userName=${searchUserName}`,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }}).then((response)=>{
               setSearchName("")
               setSearchedUser(response?.data[0])
           }).catch((Err)=>{
            console.log(Err)
            setSearchName("")
               if(Err.response?.data?.message){
                   setMessageError({searchErr:true})
               }
           })
        }catch(Err){
            console.log(Err)
        }
    }


    const addConversation = async(receiverId)=>{
        try{
            const body={
                senderId:userId,
                receiverId:receiverId
            }
            axios.post(ADD_NEW_CONVERSATION,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }}).then((response)=>{
                console.log(response)
            }).catch((err)=>{
                console.log(err)
            })
        }catch(Err){
            console.log(Err)
        }
    }

    return (
        <div>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 8 }}>
                    <div className="messenger">
                          <div className="chatMenu">
                            <div className="chatMenuWrapper">
                                    <div className="search-container">

                                    <input type="text" className='chatMenuInput' value={searchUserName} onChange={(e)=>setSearchName(e.target.value)} placeholder='Search for friends' />
                                    {
                                        searchUserName?.trim()!=="" && 
                                    <button className='searchButton' onClick={handleSearch}>Search</button>
                                    }
                                    </div>
                                    {
                                        searchedUser && <>
                                      {
                                        messageErrors.searchErr && <h6>No Users</h6> 
                                      }  <h6>Searched Results</h6>
                                        <div className='conversation' onClick={()=>addConversation(searchedUser._id)}>
                                        <img src={searchedUser?.profilePic} className='conversationImg' alt="" />
                                        <span className="conversationName">{searchedUser?.userName}</span>
                                        </div>
                                        </>
                                    }
                                    <Divider></Divider>
                                    <span style={{marginTop:"4px"}}>Recent Conversations</span>
                                    <Divider></Divider>
                                    {
                                        conversations?.map((c,index)=>(
                                            <div key={index+1} onClick={()=>setCurrentChat(c)}>
                                            <Conversations  conversation={c} currentUser={userId} token={token}/>
                                            </div>
                                        ))
                                    }
                            </div>
                          </div>
                        <div className="chatBox">
                            <div className="chatBoxWrapper">
                                { 
                                    currentChat ? <>
                                <div className="chatBoxTop">
                                    {
                                        messages?.map((m,index)=>(
                                            <div ref={scrollRef}>
                                            <Message message={m} key={index+1} currentChat={currentChat} own={m.sender===userId} userId={userId}/>

                                            </div>
                                        ))
                                    }
                               
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea  onChange={(e)=>setNewMessage(e.target.value)} 
                                     className="chatMessageInput" name="" id="" placeholder='Type Something'
                                     value={newMessage}></textarea>
                                    <button onClick={handleMessageSend} className='chatSubmitButton'>Send</button>
                                </div>
                                    </> 
                                    :
                                    <span>CLICK TO CONVERSATION</span>
                                }
                            </div>
                        </div>
                        <div className="chatOnline">
                            <div className="chatOnlineWrapper">
                                <ChatOnline/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger