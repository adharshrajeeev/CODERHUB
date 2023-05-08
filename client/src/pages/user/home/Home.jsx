import React,{useEffect, useRef, useState} from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
// import Posts from "../../../components/user/posts/Posts"
import RightBar from '../../../components/user/rightBar/RightBar';
import { fetchUserDetails } from "../../../api/UserServices";
import "./home.scss"
import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading';
import {io} from 'socket.io-client'
import { useSelector } from 'react-redux';
const LazyPosts = React.lazy(()=>import('../../../components/user/posts/Posts'))

function Home() {

  const [socket,setSocket]=useState(null)
  const [userName,setUserName]=useState("");
  // const [user,setUser]=useState(null)

  const user = useSelector((state)=>state?.user?.user?.userName)
  console.log(user,"userda")

  useEffect(()=>{
    fetchUserDetails();
  },[])

  useEffect(()=>{
    setSocket(io('ws://localhost:7000'))
  },[])

  useEffect(()=>{
    socket?.emit("newUser",user);
  },[socket,user])

 
  return (
    <div>
      <Navbar socket={socket}/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 6 }}>
      <div className="home">
      <React.Suspense fallback={<SkeletonLoading/>}>
      <LazyPosts socket={socket} user={user}/>
        </React.Suspense>  
  
      </div>
        </div>
        <RightBar />
      </div>
    </div>
  )
}

export default Home