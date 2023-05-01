import React, { useEffect, useState } from 'react'
import axios  from '../../../utils/axios';
import { GET_ALL_CONVERSATIONS } from '../../../utils/ConstUrls';
import decodeToken from '../../../utils/Services';

function Chats() {

  const [chats, setChats] = useState([]);
  const userId=decodeToken();
  const token=localStorage.getItem('token')

  const getAllChats = async () => {

    try {

      const getConversation=await axios.get(`${GET_ALL_CONVERSATIONS}/${userId}`,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json" }})
      setChats(getConversation.data.userDetails);
     
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getAllChats();
  }, [])

  console.log(chats,"chatsda")

  return (
    <div className='allChats'>
      
     { chats?.map((user,index)=>(
      
     <div className="userChats" key={index+1}>
        <img src={user?.profilePic} alt="" />
        <div className="userChatInfo">
          <span>{user.userName}</span>
          <p>Hello</p>
        </div>
      </div>
     )) 
      }
    </div>
  )
}

export default Chats