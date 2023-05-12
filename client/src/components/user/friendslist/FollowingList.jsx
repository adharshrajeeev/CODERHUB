import React, { useState } from 'react'
import './FriendsStyle.css'
import decodeToken from '../../../utils/Services'
import toast,{Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { unFollowUser } from '../../../api/UserServices'
import LoadingButton from '@mui/lab/LoadingButton';

function Following({users,listFollowingUsers}) {

  const [loading,setLoading]=useState(false)

  const handleUnfollow =  async ()=>{
    const userId=decodeToken();
    const followingId=users._id;
    const body={
      userId,
      followingId
    }
    try{
      setLoading(true)
    const response = await unFollowUser(body)
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
  }catch(err){
    setLoading(false)
    toast.error("OOPS Something went wrong");
    console.log(err)
  }

  }

  return (
    <div className="card-container">

    <img className="round" style={{ width: "100px",height:"100px" }} src={users?.profilePic ? users.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx687wePRshC2SLhc2L9Xu4sZHUifOnZGQQ&usqp=CAU"} alt="user" />
    <Link to={`/user-profile/${users._id}`}   style={{ cursor:"pointer",textDecoration: "none", color: "inherit" }}>
      <h3>{users?.userName}</h3>
      </Link>
      <LoadingButton  variant="contained" loading={loading} onClick={handleUnfollow}>
        UNFOLLOW
      </LoadingButton>
    <Toaster/>
  </div>
  )
}

export default Following