import React, { useState } from 'react'
import axios from '../../../utils/axios'
import { ADD_NEW_CONVERSATION, GET_FOLLOWING_LIST, SEARCH_USER_FOLLOWINGS } from '../../../utils/ConstUrls';
import decodeToken from '../../../utils/Services';

function SearchBar() {

  const [userName,setUserName]=useState("")
  const [user,setUser]=useState(null);
  const [err,setErr]=useState(false)
  const token=localStorage.getItem('token');
  const userId=decodeToken()
  const handleSearch = async()=>{
    try{

      const searchUsers=await axios.get(`${SEARCH_USER_FOLLOWINGS}?userId=${userId}&userName=${userName}`,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }});
      setUser(searchUsers.data[0])
    }catch(err){
      setErr("No User")
    }
  }


  const handleSelect = async(receiverId)=>{
    console.log(receiverId);
    const body=JSON.stringify({
      senderId:userId,
      receiverId
    })
    try{

      const res=await axios.post(ADD_NEW_CONVERSATION,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }})
      console.log(res,"add conversation ")
      setUser(null)
      setUserName("");
    }catch(err){
      console.log(err)
    }
  }



  return (
    <div className='messageSearch'>
        <div className='searchForm'>
            <input type="text" placeholder='search users' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
        </div>
        {err && <span>User Not Found</span>}
       {user && <div className="userChats" onClick={()=>handleSelect(user?._id)}>
            <img src={user?.profilePic} alt=""  />
            <div className="userChatInfo">
                <span>{user?.userName}</span>
            </div>
         </div>}
    </div>
  )
}

export default SearchBar