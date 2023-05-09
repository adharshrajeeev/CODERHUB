import React, { useEffect, useState } from 'react'
import './FriendStyle.scss'
import Navbar from '../../../components/user/navbar/Navbar'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import decodeToken from '../../../utils/Services';
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading'
import { fetchAllConnections } from '../../../api/UserServices';
const LazyFriendsLists = React.lazy(() => import('../../../components/user/friendslist/ConnectionsList'))

function Connections() {
  const userId = decodeToken();
  const [connections, setConnections] = useState([]);

  const listAllUsers = async () => {

    try {
      const response = await fetchAllConnections(userId)
      setConnections(response?.data);

    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  }

  useEffect(() => {
    listAllUsers();
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
                  connections?.map(users => (
                    <Grid item xs={4}>
                      <React.Suspense fallback={<SkeletonLoading />}>
                        <LazyFriendsLists users={users} key={users._id} listAllUsers={listAllUsers} />
                      </React.Suspense>
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