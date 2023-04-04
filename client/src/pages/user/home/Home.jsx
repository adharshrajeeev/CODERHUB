import React,{useEffect} from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import Posts from "../../../components/user/posts/Posts"
import RightBar from '../../../components/user/rightBar/RightBar';
import { fetchUserDetails } from "../../../api/UserServices";

import { useSelector } from 'react-redux';
import "./home.scss"
function Home() {

  useEffect(()=>{
    fetchUserDetails();
  },[])

  const userId=useSelector((state)=>state?.user?.user?._id)
 
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
        <RightBar userId={userId}/>
      </div>
    </div>
  )
}

export default Home