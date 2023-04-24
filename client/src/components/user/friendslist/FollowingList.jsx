import React from 'react'
import './FriendsStyle.css'
import axios from '../../../utils/axios'
import decodeToken from '../../../utils/Services'
import toast,{Toaster} from 'react-hot-toast'
import { UNFOLLOW_USER } from '../../../utils/ConstUrls'
import { Link } from 'react-router-dom';

function Following({users,listFollowingUsers}) {


  const handleUnfollow =  async ()=>{
    const userId=decodeToken();
    const followingId=users._id;
    const body=JSON.stringify({
      userId,
      followingId
    })
    const token=localStorage.getItem('token');

    axios.post(UNFOLLOW_USER,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }}).then((response)=>{
      toast(response.data.message,
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      listFollowingUsers();
    }).catch((err)=>{
      toast.error("OOPS Something went wrong");
      console.log(err)
    })

  }

  return (
    <div className="card-container">

    <img className="round" style={{ width: "100px",height:"100px" }} src={users?.profilePic ? users.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx687wePRshC2SLhc2L9Xu4sZHUifOnZGQQ&usqp=CAU"} alt="user" />
    <Link to={`/user-profile/${users._id}`}   style={{ cursor:"pointer",textDecoration: "none", color: "inherit" }}>
      <h3>{users?.userName}</h3>
      </Link>
    <div className="buttons">
      <button className="followingList" onClick={handleUnfollow}>
        UNFOLLOW
      </button>
    </div>
    <Toaster/>
  </div>
  )
}

export default Following