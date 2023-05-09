import React, { useEffect, useState } from 'react'
import './FriendStyle.scss'
import Navbar from '../../../components/user/navbar/Navbar'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import FollowignLists from '../../../components/user/friendslist/FollowingList';
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import decodeToken from '../../../utils/Services';
import { fetchAllFollowings } from '../../../api/UserServices';

function Followings() {

  const [following, setFollowing] = useState([])
  const userId = decodeToken();

  const listFollowingUsers = async () => {
    try{
      const response = await fetchAllFollowings(userId)
      setFollowing(response.data)
    }catch(err){
      toast.error(err?.response?.data?.message)
    }
  }

  useEffect(() => {
    listFollowingUsers();
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 8 }}>
          <div className="friendsList">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {
                  following?.map((users, index) => (
                    <Grid item xs={4}>
                      <FollowignLists users={users} key={index} listFollowingUsers={listFollowingUsers} />
                    </Grid>

                  ))
                }
              </Grid>
            </Box>
          </div>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </>
  )
}

export default Followings