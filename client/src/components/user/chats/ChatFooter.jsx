import React  from 'react'
import { Box,IconButton, InputAdornment, Stack, TextField, } from '@mui/material'
import { styled } from '@mui/material/styles';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Telegram } from '@mui/icons-material';
const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
      paddingTop: "12px !important",
      paddingBottom: "12px !important",
    },
  }))

function ChatFooter({newMessage,setNewMessage,handleMessageSend}) {
  return (
    <Box sx={{  width: "142vh", backgroundColor: "#d8e3ff", boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",position: "absolute", bottom: 0  }}>
    <Stack direction={"row"} alignItems={"center"}  >
       <StyledInput 
       fullWidth 
       placeholder='Write a Message' 
       variant='filled' 
       value={newMessage}
        onChange={(e)=>setNewMessage(e.target.value)}
       InputProps={{
        disableUnderline:true,
        endAdornment:<InputAdornment>
        <IconButton>
            <TagFacesIcon/>
        </IconButton>
        </InputAdornment>
       }}/>
       <Box sx={{height:48,width:48,backgroundColor:"#ffffff",borderRadius:2}}>

       <IconButton  onClick={handleMessageSend}>
        <Telegram />
       </IconButton>
       </Box>
    </Stack>
</Box> 
  )
}

export default ChatFooter