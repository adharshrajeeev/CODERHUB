import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/admin/navbar/Navbar'
import AdminSidebar from '../../../components/admin/sidebar/Sidebar'
import AdminWidget from '../../../components/admin/widgets/Widget'
import axios from '../../../utils/axios'
import {adminConfig} from '../../../utils/Services'
import { GET_ALL_USERS } from '../../../utils/ConstUrls';
import { useSelector } from "react-redux";

import './home.scss';



function Home() {

  const [userCount,setUserCount]=useState(0);
  const adminToken=useSelector((state)=>state.admin.adminToken);

  

  const getTotalUsers = async()=>{
    
    try{
      
      const {data}=await axios.get(GET_ALL_USERS,adminConfig); 
      setUserCount(data.length)
    }catch(err){
      console.log("user details get error",err)
    }

  }
  useEffect(()=>{
    getTotalUsers();
  },[])

  return (
    <div className="adminHome">
    <AdminSidebar />
    <div className="homeContainer">
      <AdminNavbar />
      <div className="widgets">
      <AdminWidget title="TOTAL USERS" userCount={userCount}  />
      <AdminWidget/>
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