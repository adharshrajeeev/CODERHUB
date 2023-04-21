import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

function Messages() {
  return (
   <Box>
    <Stack spacing={3}>
        <Stack direction={"row"} justifyContent={"end"}>
            <Box p={1.5} sx={{backgroundColor:"blue",borderRadius:1.5,width:"max-content"}}>
                <Typography>Hi da</Typography>
            </Box>
        </Stack>
    </Stack>
   </Box>
  )
}

export default Messages