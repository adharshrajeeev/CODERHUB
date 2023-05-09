import React from 'react'
import '../adminUserList/userLists.scss'
import AdminNavbar from '../../../components/admin/navbar/Navbar'
import AdminSidebar from '../../../components/admin/sidebar/Sidebar'
import PostList from '../../../components/admin/postTable/PostList'


function AdminPostList() {
  return (
    <div className="userList">
    <AdminSidebar />
    <div className="homeContainer">
      <AdminNavbar />
      <div className="listContainer">
        <div className="listTitle">Post List</div>
      </div>
      <div style={{margin:"15px"}} >
        <PostList/>
      </div>
    </div>
  </div>
  )
}

export default AdminPostList