import React, { useEffect, useState } from 'react'
import './FriendStyle.scss'
import Navbar from '../../../components/user/navbar/Navbar'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import FollowersList from '../../../components/user/friendslist/FollowersList';
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import decodeToken from '../../../utils/Services';
import { fetchAllFollowers } from '../../../api/UserServices';

function Followers() {


  const [followers, setFollowers] = useState([])
  const userId = decodeToken();

  const getAllFollowers = async ()=>{
    try{
      const response = await fetchAllFollowers(userId);
      setFollowers(response.data);
    }catch(err){
      toast.error(err?.response?.data?.message)
    }
  }

  useEffect(()=>{
    getAllFollowers();
  },[])
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
                  followers?.map((users, index) => (
                    <Grid item xs={4}>
                      <FollowersList users={users} key={index} getAllFollowers={getAllFollowers} />
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