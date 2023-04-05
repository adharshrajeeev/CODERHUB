import React from 'react'
import './FriendStyle.scss'
import Navbar from '../../../components/user/navbar/Navbar'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import FollowignLists from '../../../components/user/friendslist/FriendsList';

function Followings() {
  return (
    <>
      <Navbar/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 8 }}>
      <div className="friendsList">
       
    <FollowignLists/>
      </div>
        </div>
        {/* <RightBar /> */}
      </div>
   </>
  )
}

export default Followings