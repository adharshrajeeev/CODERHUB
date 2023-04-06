import React from 'react'
import './FriendsStyle.css'
import axios from '../../../utils/axios'
import decodeToken from '../../../utils/Services';
import { FOLLOW_USER, REMOVE_FOLLOWER } from '../../../utils/ConstUrls';
import toast,{Toaster} from 'react-hot-toast'


function Followers({users,getAllFollowers}) {


  // const handleFollowBack = async()=>{
  //   const userId=decodeToken();
  //   const followerId=users._id
  //   const body=JSON.stringify({
  //     userId,
  //     followerId
  //   })
  //   const token=localStorage.getItem('token')
  //   axios.post(FOLLOW_USER,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }}).then((response)=>{
  //     toast.success(response.data.message);
  //     getAllFollowers();
  //   }).catch((err)=>{
  //     toast.error("oops something went wrong")
  //   })
  // }

  const handleRemove = async()=>{
    const userId=decodeToken();
    const followerId=users._id
    const body=JSON.stringify({
      userId,
      followerId
    })
    const token=localStorage.getItem('token')
    axios.post(REMOVE_FOLLOWER,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }}).then((response)=>{
      toast.success(response.data.message);
      getAllFollowers();
    }).catch((err)=>{
      toast.error("oops something went wrong")
    })
  }
  return (
    <div className="card-container">

    <img className="round" style={{ width: "100px",height:"100px" }} src={users?.profilePic ? users.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx687wePRshC2SLhc2L9Xu4sZHUifOnZGQQ&usqp=CAU"} alt="user" />
    <h3>{users?.userName}</h3>
    <div className="buttons">
      <button className="followersLists" onClick={handleRemove}>
       Remove
      </button>
    </div> 
    <Toaster/>
  </div>
  )
}

export default Followers