import React from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import Posts from "../../../components/user/posts/Posts"
import RightBar from '../../../components/user/rightBar/RightBar';

import "./home.scss"
function Home() {




  return (
    <div>
      <Navbar/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 6 }}>
      <div className="home">
        <Posts/>
  
      </div>
        </div>
        <RightBar/>
      </div>
    </div>
  )
}

export default Home