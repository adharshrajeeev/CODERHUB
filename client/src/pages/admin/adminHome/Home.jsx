import React, { useEffect, useState } from 'react'
import './home.scss';
import AdminNavbar from '../../../components/admin/navbar/Navbar'
import AdminSidebar from '../../../components/admin/sidebar/Sidebar'
import AdminWidget from '../../../components/admin/widgets/Widget'
import UserChart from '../../../components/admin/charts/UserChart'
import { Box, Grid } from '@mui/material'
import PostChat from '../../../components/admin/charts/PostChat'
import { fetchAllPosts, fetchAllUsers } from '../../../api/AdminServices'



function Home() {

  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostsCount] = useState(0)


  const getTotalUsers = async () => {

    try {

      const data = await fetchAllUsers();
      setUserCount(data.length)
    } catch (err) {
      alert(err.response.data.message)
    }

  }

  const getAllPosts = async () => {
    try {

      const data = await fetchAllPosts();
      setPostsCount(data.length)
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  useEffect(() => {
    getTotalUsers();
    getAllPosts();
  }, [])

  return (
    <div className="adminHome">
      <AdminSidebar />
      <div className="homeContainer">
        <AdminNavbar />
        <div className="widgets">
          <AdminWidget title="TOTAL USERS" count={userCount} />
          <AdminWidget title="TOTAL POSTS" count={postCount} />
        </div>
        <div className="charts">
          <Box>
            <Grid container>
              <Grid item xs={12} md={6}>
                <UserChart />
              </Grid>
              <Grid item xs={12} md={6}>
                <PostChat />
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Home