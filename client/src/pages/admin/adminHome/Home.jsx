import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/admin/navbar/Navbar'
import AdminSidebar from '../../../components/admin/sidebar/Sidebar'
import AdminWidget from '../../../components/admin/widgets/Widget'
import axios from '../../../utils/axios'
import {adminConfig} from '../../../utils/Services'
import { GET_ALL_POSTS, GET_ALL_USERS } from '../../../utils/ConstUrls';


import './home.scss'; 



function Home() {

  const [userCount,setUserCount]=useState(0);
  const [postCount,setPostsCount]=useState(0)
  const adminToken=localStorage.getItem('adminToken')

  

  const getTotalUsers = async()=>{
    
    try{
      
      const {data}=await axios.get(GET_ALL_USERS,adminConfig); 
      setUserCount(data.length)
    }catch(err){
      console.log("user details get error",err)
    }

  }

  const getAllPosts= async()=>{
    axios.get(GET_ALL_POSTS,adminConfig).then((res)=>{
      setPostsCount(res.data.length)
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getTotalUsers();
    getAllPosts();
  },[])

  return (
    <div className="adminHome">
    <AdminSidebar />
    <div className="homeContainer">
      <AdminNavbar />
      <div className="widgets">
      <AdminWidget title="TOTAL USERS" count={userCount}  />
      <AdminWidget title="TOTAL POSTS" count={postCount}/>
        <AdminWidget/>
        {/* <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" /> */}
      </div>
      <div className="charts">
        {/* <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        {/* <Table /> */}
      </div>
    </div>
  </div>
  )
}

export default Home