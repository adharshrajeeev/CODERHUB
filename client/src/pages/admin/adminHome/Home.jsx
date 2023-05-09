import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/admin/navbar/Navbar'
import AdminSidebar from '../../../components/admin/sidebar/Sidebar'
import AdminWidget from '../../../components/admin/widgets/Widget'
import axios from '../../../utils/axios'
import {adminConfig} from '../../../utils/Services'
import { GET_ALL_POSTS, GET_ALL_USERS } from '../../../utils/ConstUrls';


import './home.scss'; 
import UserChart from '../../../components/admin/charts/UserChart'
import { Box, Grid } from '@mui/material'
import PostChat from '../../../components/admin/charts/PostChat'
import { fetchAllPosts, fetchAllUsers } from '../../../api/AdminServices'



function Home() {

  const [userCount,setUserCount]=useState(0);
  const [postCount,setPostsCount]=useState(0)


  const getTotalUsers = async()=>{
    
    try{
      
      const data=await fetchAllUsers();
      setUserCount(data.length)
    }catch(err){
      alert(err.response.data.message)
    }

  }

  const getAllPosts= async()=>{
    try{

      const data=await fetchAllPosts();
      setPostsCount(data.length)
    }catch(err){
      alert(err.response.data.message)
    }
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
        {/* <AdminWidget/> */}
        {/* <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" /> */}
      </div>
      <div className="charts">
        <Box>
          <Grid container spacing={2}>
        <Grid xs={6} md={6}>

      <UserChart/>
        </Grid>
        <Grid xs={6}  md={6}>
      <PostChat/>

        </Grid>
          </Grid>
        </Box>
        {/* <UserChart/> */}
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