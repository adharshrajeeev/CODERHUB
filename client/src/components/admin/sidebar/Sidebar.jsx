import React from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import './sidebar.scss'

function Sidebar() {

  const navigate=useNavigate();

  const handleAdminLogout= ()=>{
    console.log(localStorage.getItem("adminToken"))
    localStorage.removeItem("adminToken");
    navigate('/admin')
  }

  return (  
    <div className="adminSidebar">
    <div className="top">
      <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
        <span className="logo">CODERHUB ADMIN</span>
      </Link>
    </div>
    <hr />
    <div className="center">
      <ul>
        <p className="title">MAIN</p>
        <li>
          <DashboardIcon className="icon" />
          <span>Dashboard</span>
        </li>
        <p className="title">LISTS</p>
        <Link to="/users" style={{ textDecoration: "none" }}>
          <li>
            <PersonOutlineIcon className="icon" />
            <span>Users</span>
          </li>
        </Link>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <li>
            <StoreIcon className="icon" />
            <span>POSTS</span>
          </li>
        </Link>
        <p className="title">ADMIN</p>
        <li onClick={handleAdminLogout}>
          <ExitToAppIcon className="icon"  />
          <span >Logout</span>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default Sidebar