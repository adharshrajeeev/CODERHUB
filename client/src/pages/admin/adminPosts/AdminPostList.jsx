import React from 'react'
import AdminNavbar from '../../../components/admin/navbar/Navbar'
import AdminSidebar from '../../../components/admin/sidebar/Sidebar'
import PostList from '../../../components/admin/postTable/PostList'
import '../adminUserList/userLists.scss'
import SampleTable from '../../../components/admin/tables/SampleTable'

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
        {/* <SampleTable/> */}
      </div>
    </div>
  </div>
  )
}

export default AdminPostList