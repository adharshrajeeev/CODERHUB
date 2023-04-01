import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios'
import { SHOW_USERS } from '../../../utils/ConstUrls';
import DefaultPhoto from '../../../assets/noProfilePicture.jpg'

function FriendSuggestions() {

    const [userList,SetUsers]=useState([])

    const getFriendSuggestions =  async ()=>{
     const token = document.cookie.slice(6)
     const {data} =  await axios.get(SHOW_USERS,{ headers: { 'Authorization': `Bearer ${token}` } });
     console.log(data,"user list")
        SetUsers(data);
    }

    const handleDismiss =  (userId)=>{
        const updatedUser=userList.filter((user)=>user._id !== userId);
        SetUsers(updatedUser)
    }

    useEffect(()=>{
        getFriendSuggestions();
    },[])

  return (
    <div>
        <span>Pleople U may know</span>
        {
            userList.map((user,index)=>(

          <div className="user" key={index}>
            <div className="userInfo">
              <img
                src={user.profilePic ? user.profilePic : DefaultPhoto}
                alt="picture"
              />
              <span>{user.userName}</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button onClick={()=>handleDismiss(user._id)} >dismiss</button>
            </div>
          </div>
            ))
        }
    </div>
  )
}

export default FriendSuggestions