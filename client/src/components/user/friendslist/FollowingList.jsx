import React from 'react'
import './FriendsStyle.css'

function Following({users}) {
  return (
    <div className="card-container">

    <img className="round" style={{ width: "100px",height:"100px" }} src={users?.profilePic ? users.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx687wePRshC2SLhc2L9Xu4sZHUifOnZGQQ&usqp=CAU"} alt="user" />
    <h3>{users?.userName}</h3>
    <div className="buttons">
      <button className="followingList">
        UnFollow
      </button>
    </div>
  </div>
  )
}

export default Following