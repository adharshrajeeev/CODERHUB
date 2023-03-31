import React from 'react'
import AdminNavbar from '../../../components/admin/navbar/Navbar'
import AdminSidebar from '../../../components/admin/sidebar/Sidebar'
import './home.scss';


function Home() {
  return (
    <div className="adminHome">
    <AdminSidebar />
    <div className="homeContainer">
      <AdminNavbar />
      <div className="widgets">
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