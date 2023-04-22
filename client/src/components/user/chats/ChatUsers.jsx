import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import { IconButton, Stack, Typography } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import OnlineUsers from './OnlineUsers';


function ChatUsers({conversations,userId,setCurrentChat}) {

   

  
    return (
        <Box sx={{ position: "relative", width: 300, backgroundColor: "white", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}>
            <Stack p={3} spacing={2} >

                <Stack direction="row" alignItems='center' justifyContent='space-between'>
                    <Typography variant='h5'>
                        Chats
                    </Typography>
                    <IconButton>
                        <TelegramIcon />
                    </IconButton>
                </Stack>
                <Stack direction='column'>
                    <Stack spacing={2.4}>

                        <Typography variant='subtitle2'>
                            All Chats
                        </Typography>
                        {   
                            conversations.map((c,index)=>
                              (
                                <div onClick={()=>setCurrentChat(c)} style={{cursor:"pointer"}}>
                                    <OnlineUsers conversations={c} key={index} currentUser={userId}/>
                                </div>
                              )  

                            )
                        }
                       
                    </Stack>
                </Stack>

            </Stack>
        </Box>
    )
}

export default ChatUsers