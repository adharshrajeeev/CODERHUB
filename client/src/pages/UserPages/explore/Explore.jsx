import React from 'react'
import SideBar from '../../../components/UserComponets/LeftPanel/SideBar';
import RightBar from '../../../components/UserComponets/SidePanel/RightBar';
import Navbar from '../../../components/UserComponets/NavbarComp/Navbar';
import { Box, Stack } from '@mui/material'
import AllPosts from '../../../components/UserComponets/ExplorePosts/AllPosts';

function Explore() {
  return (
    <Box >
     <Navbar/>
      <Stack direction="row" spacing="2" justifyContent="space-between" >
      <SideBar />
        <AllPosts/>
      <RightBar />
      </Stack>
    </Box>
  )
}

export default Explore