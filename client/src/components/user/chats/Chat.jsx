import React from 'react'
import ChatUsers from './ChatUsers';
import Conversation from './Conversation';
import { Box, Stack } from '@mui/material';

function Chat() {
  return (

      <Stack direction='row' sx={{ width:"100%",height:"100%" }}>
        <ChatUsers />
        <div style={{width:"100%"}} >
          <Conversation />

        </div>
        {/* <Box sx={{height:"100%", width:"100vh", backgroundColor:"black"}}>
        </Box> */}
      </Stack>

  )
}

export default Chat