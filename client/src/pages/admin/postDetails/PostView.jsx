import React from 'react'
import AdminNavbar from '../../../components/admin/navbar/Navbar'
import AdminSidebar from '../../../components/admin/sidebar/Sidebar'
import DetailedPost from '../../../components/admin/postDetailed/DetailedPost'

function PostView() {
  return (
    <div className="userList">
    <AdminSidebar />
    <div className="homeContainer">
      <AdminNavbar />
      <div className="listContainer">
        <div className="listTitle">Post List</div>
      </div>
      <div >
       
      <DetailedPost/>
      </div>
    </div>
  </div>
  )
}

export default PostView