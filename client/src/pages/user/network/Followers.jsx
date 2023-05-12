import React, { useEffect, useState } from 'react'
import './FriendStyle.scss'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import decodeToken from '../../../utils/Services';
import { fetchAllFollowers } from '../../../api/UserServices';
import NewNavbar from '../../../components/user/navbar/NewNavbar';
import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading'
import NoDataAvailable from '../../../components/user/noDataAvailable/NoDataFound'
const LazyFollowers = React.lazy(()=>import('../../../components/user/friendslist/FollowersList'))

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
  },[followers])
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
                   followers && followers.length > 0 ?
                  followers?.map((users, index) => (
                    <Grid item xs={4}>
                      <React.Suspense fallback={<SkeletonLoading/>}>
                        <LazyFollowers users={users} key={index} getAllFollowers={getAllFollowers}/>
                      </React.Suspense>
                    </Grid>

                  ))
                  :
                  <Grid item xs={12}>
                  <NoDataAvailable data={"Followers"}/>
                </Grid>
                }
              </Grid>
            </Box>
          </div>
        </div>
        <Toaster
         position="bottom-left"
          reverseOrder={false}
        />
      </div>
    </>
  )
}

export default Followers