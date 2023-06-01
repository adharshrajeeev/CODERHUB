import React, { useEffect, useState } from 'react'
import './FriendStyle.scss'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import decodeToken from '../../../utils/Services';
import { fetchAllFollowings } from '../../../api/UserServices';
import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading'
import NewNavbar from '../../../components/user/navbar/NewNavbar';
import NoDataAvailable from '../../../components/user/noDataAvailable/NoDataFound'
const LazyFollowings = React.lazy(()=>import('../../../components/user/friendslist/FollowingList'))

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
  }, [following])

  return (
    <>
      <NewNavbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 8 }}>
          <div className="friendsList">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {
                  following && following.length > 0 ?
                  following?.map((users, index) => (
                    <Grid item xs={12} sm={6} md={4}>
                      <React.Suspense fallback={<SkeletonLoading />}>
                          <LazyFollowings users={users} key={index} listFollowingUsers={listFollowingUsers}/>
                      </React.Suspense>
                    </Grid>
                  ))
                  :
                  <Grid item xs={12}>
                  <NoDataAvailable data={"Followings"}/>
                </Grid>
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