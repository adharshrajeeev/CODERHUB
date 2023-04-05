import React, { useEffect, useState } from 'react'
import './FriendStyle.scss'
import Navbar from '../../../components/user/navbar/Navbar'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import FollowignLists from '../../../components/user/friendslist/ConnectionsList';
import decodeToken from '../../../utils/Services';
import axios from '../../../utils/axios'
import { GET_CONNECTIONS } from '../../../utils/ConstUrls';
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


function Connections() {
  const userId = decodeToken();
  const [connections, setConnections] = useState([]);
 
  const listAllUsers = async () => {
    const token = localStorage.getItem('token')
    axios.get(`${GET_CONNECTIONS}/${userId}`, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json", } }).then((response) => {
      setConnections(response.data);
    }).catch((err) => {
        toast.error("Oops Something went Wrong")
    })
  }

  useEffect(()=>{
    listAllUsers();
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
                  connections.map(users=>(
                <Grid item xs={4}>
                   <FollowignLists users={users} key={users._id} listAllUsers={listAllUsers}/>
                </Grid>

                  ))
                }


              </Grid>
            </Box>
          
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default Connections