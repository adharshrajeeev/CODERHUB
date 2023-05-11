import React, { useEffect, useState }  from 'react'
import './NavbarStyle.scss'
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Searches from '../searchedList/Searches';
import Badge from '@mui/material/Badge';




function Navbar({socket}) {

  const [notifications,setNotifications]=useState([])
  const userName=useSelector((state)=>state.user?.user?.userName);
  const navigate=useNavigate();


  useEffect(()=>{
    socket?.on('getNotification',data=>{
      setNotifications(prev=>[...prev,data])
    })
  },[socket])

  

  return (
    <div className="navbar">
    <div className="left">
      <Link to="/home" style={{ textDecoration: "none" }}>
        <span>CODERHUB</span>
      </Link>
      <div className="search">
      {/* <SearchResults/> */}
      <Searches/>
      
      </div>
    </div>
    <div className="right">
      <PersonOutlinedIcon onClick={()=>navigate('/profile')} sx={{cursor:"pointer"}}/>
      <EmailOutlinedIcon />
        <Badge badgeContent={notifications?.length} color="primary">
      
      <NotificationsOutlinedIcon onClick={()=>navigate('/notifications')} sx={{cursor:"pointer"}}/>
      </Badge>
    
      <div className="user">
        {/* <img
          src=
          alt=""
        /> */}
        <span>{userName}</span>
      </div>
    </div>
  </div>
  )
}

export default Navbar