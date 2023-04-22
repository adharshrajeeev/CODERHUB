import React  from 'react'
import { Box,  Typography,Stack, TextField, } from '@mui/material'


function Messages({messages,own}) {
    
  return (
      <Box > 
    <Stack >
        <Stack direction={"row"} justifyContent={ own ? "end" : "start" }>
            <Box p={1.5}  sx={{backgroundColor: own ? "blue" : "red",borderRadius:1.5,width:"max-content"}}>
                <Typography>{messages.text}</Typography>
            </Box> 
        </Stack>
        {/* <Stack direction={"row"} justifyContent={!own && "start"}>
            <Box p={1.5}   sx={{backgroundColor:"red",borderRadius:1.5,width:"max-content"}}>
                <Typography>{messages.text}</Typography>
            </Box>
        </Stack> */}
    </Stack>
  
   </Box>
  )
}

export default Messages