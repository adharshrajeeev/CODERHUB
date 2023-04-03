import React from 'react'
import ExplorePosts from '../../../components/user/explore/ExplorePosts'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import RightBar from '../../../components/user/rightBar/RightBar';

function Explore() {

  return (
    <div>
      <Navbar/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 6 }}>
      <div className="home">
        <ExplorePosts/>
      </div>
        </div>
        <RightBar/>
      </div>
    </div>
  )
}

export default Explore