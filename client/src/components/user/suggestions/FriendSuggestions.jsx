import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios'
import { GET_USER_SUGGESTIONS } from '../../../utils/ConstUrls';
import DefaultPhoto from '../../../assets/noProfilePicture.jpg'


function FriendSuggestions({userId}) {

    const [userList,SetUsers]=useState([]);

    const getFriendSuggestions =  async ()=>{
      try{
        console.log(userId)
        const token =localStorage.getItem('token')
        const {data} =  await axios.get(`${GET_USER_SUGGESTIONS}/${userId}`,{ headers: { 'Authorization': `Bearer ${token}` } });
       
           SetUsers(data); 
           console.log(userList,"this is suggestions")
      }catch(err){
        console.log("suggestions catch err",err)
      }
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
                alt="profilePicture"
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