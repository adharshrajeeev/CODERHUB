import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import './ConversationsStyle.css'
import { GET_USER } from '../../../utils/ConstUrls';

function Conversations({conversation,currentUser,token}) {

    const [user,setUser]=useState(null);

    useEffect(()=>{
        const friendId=conversation.members?.find(m=>m!==currentUser);

        const getUser=async()=>{
            try{

                const res=await axios.get(`${GET_USER}/${friendId}`,{ headers: { 'Authorization': `Bearer ${token}` } });
                setUser(res.data)
            }catch(err){
                console.log(err)
            }

        }
        getUser();
    },[])

  return (
    <div className='conversation'>
        <img src={user?.profilePic} className='conversationImg' alt="" />
        <span className="conversationName">{user?.userName}</span>
        </div>
  )
}

export default Conversations