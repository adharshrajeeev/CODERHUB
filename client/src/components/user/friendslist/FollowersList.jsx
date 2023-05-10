import React from 'react'
import './FriendsStyle.css'
import decodeToken from '../../../utils/Services';
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { removeFollower } from '../../../api/UserServices';


function Followers({ users, getAllFollowers }) {


  const handleRemove = async () => {
    const userId = decodeToken();
    const followerId = users._id
    const body = {
      userId,
      followerId
    }
    try{
      const response = await removeFollower(body)
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
      getAllFollowers();
      
    }catch(err){
      toast.error("oops something went wrong")
    }
  }
  return (
    <div className="card-container">

      <img className="round" style={{ width: "100px", height: "100px" }} src={users?.profilePic ? users.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx687wePRshC2SLhc2L9Xu4sZHUifOnZGQQ&usqp=CAU"} alt="user" />
      <Link to={`/user-profile/${users._id}`}   style={{ cursor:"pointer",textDecoration: "none", color: "inherit" }}>
      <h3>{users?.userName}</h3>
      </Link>
      <div className="buttons">
        <button className="followersLists" onClick={handleRemove}>
          Remove
        </button>
      </div>
      <Toaster />
    </div>
  )
}

export default Followers