import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import CircularProgress from '@mui/material/CircularProgress';
import { GET_USER_SUGGESTIONS } from '../../../utils/ConstUrls';
import DefaultPhoto from '../../../assets/noProfilePicture.jpg'
import jwtDecode from 'jwt-decode';
// import {userId} from '../../../utils/decodeToken'

function FriendSuggestions() {

    const [userList,SetUsers]=useState([]);
    const [isLoading,setIsLoading]=useState(false);

    const getFriendSuggestions =  async ()=>{
      try{
        const userId=jwtDecode(localStorage.getItem('token'))
        setIsLoading(true)
        const token =localStorage.getItem('token')
        const {data} =  await axios.get(`${GET_USER_SUGGESTIONS}/${userId.id}`,{ headers: { 'Authorization': `Bearer ${token}` } });
       
           SetUsers(data); 
          setIsLoading(false)
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

        {   isLoading ? <CircularProgress/> :
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