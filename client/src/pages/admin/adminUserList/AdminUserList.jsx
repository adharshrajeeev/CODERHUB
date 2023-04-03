import React from 'react'
import AdminNavbar from '../../../components/admin/navbar/Navbar'
import AdminSidebar from '../../../components/admin/sidebar/Sidebar'
import './userLists.scss'
import UserList from '../../../components/admin/userTable/UserList'


function AdminUserList() {
  return (
    <div className="userList">
    <AdminSidebar />
    <div className="homeContainer">
      <AdminNavbar />
      <div className="listContainer">
        <div className="listTitle">Users List</div>
      </div>
      <div style={{margin:"15px"}} >
        <UserList/>

      </div>
    </div>
  </div>
  )
}

export default AdminUserList