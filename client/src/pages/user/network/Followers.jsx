import React, { useEffect, useState } from 'react'
import './FriendStyle.scss'
import Navbar from '../../../components/user/navbar/Navbar'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import FollowersList from '../../../components/user/friendslist/FollowersList';
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import decodeToken from '../../../utils/Services';
import axios from '../../../utils/axios'
import { GET_FOLLOWERS_LIST } from '../../../utils/ConstUrls';

function Followers() {


  const [followers, setFollowers] = useState([])
  const userId = decodeToken();

  const getAllFollowers = async ()=>{
    const token=localStorage.getItem('token')
    axios.get(`${GET_FOLLOWERS_LIST}/${userId}`, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json", } }).then((response)=>{
      setFollowers(response.data);
    }).catch((err)=>{
      toast.error("Oops Something went Wrong")
    })
  }

  useEffect(()=>{
    getAllFollowers();
  })
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
                  followers.map((users, index) => (
                    <Grid item xs={4}>
                      <FollowersList users={users} key={index} />
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

export default Followers