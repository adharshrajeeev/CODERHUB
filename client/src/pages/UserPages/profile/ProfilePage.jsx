import React from 'react'
import SideBar from '../../../components/UserComponets/LeftPanel/SideBar';
import Navbar from '../../../components/UserComponets/NavbarComp/Navbar';
// import RightBar from '../../../components/UserComponets/SidePanel/RightBar';
import Profile from '../../../components/UserComponets/ProfileInfo/Profile'
import { Box, Stack } from '@mui/material'



export default function ProfilePage() {
  return (

    <Box >
     <Navbar/>
      <Stack direction="row" spacing="2" justifyContent="space-between" >
      <SideBar />
      <Profile/>
      {/* <RightBar/> */}
      </Stack>
    </Box>

  )
}
