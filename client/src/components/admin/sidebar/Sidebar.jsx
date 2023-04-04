import React from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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
        <Link to="/admin/users" style={{ textDecoration: "none" }}>
          <li>
            <PersonOutlineIcon className="icon" />
            <span>Users</span>
          </li>
        </Link>
        <Link to="/admin/posts" style={{ textDecoration: "none" }}>
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