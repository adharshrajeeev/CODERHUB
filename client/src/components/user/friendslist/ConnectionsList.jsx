import React from 'react';
import axios from '../../../utils/axios'
import decodeToken from '../../../utils/Services';
import { FOLLOW_USER } from '../../../utils/ConstUrls';
import toast,{Toaster} from 'react-hot-toast'
import './FriendsStyle.css'
import { Link } from 'react-router-dom';




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
      listAllUsers();
    }).catch((err)=>{
      toast.error("oops something went wrong")
    })
  }


  return (

    <div className="card-container">

      <img className="round" style={{ width: "100px",height:"100px" }} src={users?.profilePic ? users.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx687wePRshC2SLhc2L9Xu4sZHUifOnZGQQ&usqp=CAU"} alt="user" />
      <Link to={`/user-profile/${users._id}`}   style={{ cursor:"pointer",textDecoration: "none", color: "inherit" }}>
      <h3>{users?.userName}</h3>
      </Link>
      <div className="buttons">
        <button className="communityFollow" onClick={handleFollowUser}>
          FOLLOW
        </button>
      </div>
      <Toaster/>
    </div>



  )
}

export default Followers