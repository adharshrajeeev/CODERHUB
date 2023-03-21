import React from 'react'
import SideBar from '../../../components/UserComponets/LeftPanel/SideBar';
import RightBar from '../../../components/UserComponets/SidePanel/RightBar';
import Feed from '../../../components/UserComponets/UserFeed/Feed';
import Navbar from '../../../components/UserComponets/NavbarComp/Navbar';
import { Box, Stack } from '@mui/material'

function HomePage() {
  return (

    <Box >
     <Navbar/>
      <Stack direction="row" spacing="2" justifyContent="space-between" >
      <SideBar />
      <Feed />
      <RightBar />
      </Stack>
    </Box>

  );
}

export default HomePage      