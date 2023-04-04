import React, { useEffect } from 'react'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import './NavbarStyle.scss'
import { useSelector } from 'react-redux';



function Navbar() {


  const userName=useSelector((state)=>state.user?.user?.userName);
  const navigate=useNavigate();




  return (
    <div className="navbar">
    <div className="left">
      <Link to="/" style={{ textDecoration: "none" }}>
        <span>CODERHUB</span>
      </Link>
      <HomeOutlinedIcon />
      {/* {darkMode ? (
        <WbSunnyOutlinedIcon onClick={toggle} />
      ) : (
        <DarkModeOutlinedIcon onClick={toggle} />
      )} */}
      <GridViewOutlinedIcon />
      <div className="search">
        <SearchOutlinedIcon />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
    <div className="right">
      <PersonOutlinedIcon onClick={()=>navigate('/profile')} sx={{cursor:"pointer"}}/>
      <EmailOutlinedIcon />
      <NotificationsOutlinedIcon />
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