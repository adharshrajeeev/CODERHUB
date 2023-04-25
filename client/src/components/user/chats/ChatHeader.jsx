import React, { useEffect, useState } from 'react'
import { Box,  Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import axios from '../../../utils/axios'
import { GET_USER } from '../../../utils/ConstUrls';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


function ChatHeader({currentChat,userId,token}) { 
   
    const [userDetails,setUserDetails]=useState({})
    var receiverId;
  if(currentChat.members){

       receiverId=currentChat?.members?.find((member)=>{
         return member !== userId}
          );
  }else{
    receiverId=currentChat._id
  }

   useEffect(()=>{
        try{
            axios.get(`${GET_USER}/${receiverId}`,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" } }).then((res)=>{
               setUserDetails(res.data)
               console.log(res.data)
            }).catch((Err)=>{
                console.log(Err)
            })
        }catch(err){    
            console.log(err)
        }
   },[currentChat])
  return (
    <Box p={2} sx={{ height: 50, width: "100%", backgroundColor: "#d8e3ff", boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",position:"fixed" }}>

    <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"} sx={{ width: "100%", height: "100%" }}>
        <Stack direction={"row"} spacing={2}>
            <Box >
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" src={userDetails.profilePic} />
                </StyledBadge>
            </Box>
                <Stack spacing={0.2}>
                    <Typography variant='subtitle2'>{userDetails.userName}</Typography>
                    <Typography variant='caption'>Online</Typography>
                </Stack>
        </Stack>
    </Stack>
</Box>
  )
}

export default ChatHeader