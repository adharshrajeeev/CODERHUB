import React, { useState } from 'react'
import './SearchDataStyle.css'
import toast,{Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom';

function SearchData({users}) {

    console.log(users,"all users")
   

   

  return (
    <div className="card-container">
    {
        users.map((users)=>(
         <>   
      <img className="round" style={{ width: "100px",height:"100px" }} src={users?.profilePic ? users?.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx687wePRshC2SLhc2L9Xu4sZHUifOnZGQQ&usqp=CAU"} alt="user" />
      <Link to={`/user-profile/${users?._id}`}   style={{ cursor:"pointer",textDecoration: "none", color: "inherit" }}>
      <h3>{users.userName}</h3>
      </Link>
      </>
        ))
    }
      {/* <div className="buttons">
        <button className="communityFollow" onClick={handleFollowUser}>
          FOLLOW
        </button>
      </div> */}
      <Toaster/>
    </div>
  )
}

export default SearchData