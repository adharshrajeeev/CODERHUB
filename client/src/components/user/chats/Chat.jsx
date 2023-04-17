import React from 'react'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from "@mui/material/Divider";
import { Link } from 'react-router-dom';


function Chat() {
  return (
    <Box flex={4}>
    <Card sx={{
      boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`,
      height: "90vh",
      width: "98%"
    }} >
      <Box sx={{
        textAlign: "center"
      }}>
        <Typography variant="h6" component="h1" >
          Chats
        </Typography>
      </Box>
      <Box>
        <Box>
          <TextField sx={{
            marginInline: "2rem",
            width: "98%",
            backgroundColor: "transparent"
          }} id="standard-basic" placeholder="Find User" variant="standard" />
        </Box>
        <Box >
          <List dense sx={{
            bgcolor: 'background.paper',
            maxHeight: "80vh",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none"
            }
          }}>
            {/* {converstations?.map((chat) => {
              return (
                <ChatItem
                  key={chat._id}
                  chat={chat}
                />
              );
            })} */}
               <Box >
          <Link  style={{ textDecoration: 'none', color: "inherit" }}>
          <ListItem>
              <ListItemButton>
                  <ListItemAvatar>
                      <Avatar
                          alt={`Avatar `}
                          
                      />
                  </ListItemAvatar>
                  <ListItemText/>
              </ListItemButton>
              </ListItem>
          </Link>
          <Divider />
      </Box>
          </List>
        </Box>
      </Box>
    </Card>
  </Box>
  
  )
}

export default Chat