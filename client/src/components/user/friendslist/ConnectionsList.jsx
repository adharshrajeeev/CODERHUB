import React from 'react';
import axios from '../../../utils/axios'
import decodeToken from '../../../utils/Services';
import { FOLLOW_USER } from '../../../utils/ConstUrls';
import toast,{Toaster} from 'react-hot-toast'
import './FriendsStyle.css'




function Followers({ users,listAllUsers }) {


  const handleFollowUser = async()=>{
    const userId=decodeToken();
    const followerId=users._id
    const body=JSON.stringify({
      userId,
      followerId
    })
    const token=localStorage.getItem('token')
    axios.post(FOLLOW_USER,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }}).then((response)=>{
      toast.success(response.data.message);
      listAllUsers();
    }).catch((err)=>{
      toast.error("oops something went wrong")
    })
  }


  return (

    <div className="card-container">

      <img className="round" style={{ width: "100px",height:"100px" }} src={users?.profilePic ? users.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx687wePRshC2SLhc2L9Xu4sZHUifOnZGQQ&usqp=CAU"} alt="user" />
      <h3>{users?.userName}</h3>
      <div className="buttons">
        <button className="communityFollow" onClick={handleFollowUser}>
          Follow
        </button>
      </div>
      <Toaster/>
    </div>



  )
}

export default Followers