import React, { useEffect, useState } from 'react'
import moment from 'moment'
import './MessageStyle.css'
import { useSelector } from 'react-redux'
import axios  from '../../../utils/axios'
import { GET_USER } from '../../../utils/ConstUrls'


function Message({message,own,currentChat,userId}) {

  const profilePic=useSelector((state)=>state.user?.user?.profilePic)
  const receiverId=currentChat?.members?.find((member)=>member !== userId);
  const [receiverDetails,setReceiverDetails]=useState({});
  const token=localStorage.getItem('token')
  
  useEffect(()=>{
    const getReceiverDetails=async()=>{
      const res=await axios.get(`${GET_USER}/${receiverId}`,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }})
      setReceiverDetails(res.data)
    }
    getReceiverDetails();
  },[receiverId])
  
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
        <img  src={own ? profilePic: receiverDetails?.profilePic} className='messageImg' alt="" />
        <p className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">
           {
           moment(message.createdAt).fromNow()}
        </div>
    </div>
  )
}

export default Message