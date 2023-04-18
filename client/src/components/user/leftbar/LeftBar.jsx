import React, { useEffect } from 'react'
import {
  AccountBox,
  Home,
  Article,
  ModeNight,
  Person,
  Settings,
  Message,
  Logout
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import './LeftBarStyle.scss'
import { useNavigate } from 'react-router-dom';
import AddPostModal from '../modals/AddPostModal';
// import { io } from 'socket.io-client';




function LeftBar() {

 

  // useEffect(()=>{
  //   try{
  //   const socket=io('http://localhost:7000');
  //     socket.on("firstEvent",(msg)=>{
  //       console.log(msg,"from backed") 
  //     })
  //   }catch(err){
  //     console.log("catch error in socket connection",err)
  //   }
  // },[])


  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // dispatch(setLogout());
    navigate('/')

  }

  return ( 
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {/* <div className="user">
          
          <span>adharsh</span>
        </div> */}
          <div className="item">
            <List sx={{ width: '100%', maxWidth: 360, color: "black" }}>
              <ListItem >

                <AddPostModal />

              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" onClick={() => navigate('/home')}>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Homepage" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" onClick={() => navigate('/explore')}>
                  <ListItemIcon>
                    <Article />
                  </ListItemIcon>
                  <ListItemText primary="Explore" />
                </ListItemButton>
              </ListItem>
              {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
          </ListItem> */}
              <ListItem disablePadding>
                <ListItemButton component="a" >
                  <ListItemIcon>
                    <Message />
                  </ListItemIcon>
                  <ListItemText primary="Messages" /> 
                </ListItemButton>
              </ListItem>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="My Network" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate('/connections')}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Connections" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}  onClick={()=>navigate('/people-following')}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Following" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}  onClick={()=>navigate('/people-followers')}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Followers" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItem disablePadding>
                <ListItemButton disablePadding onClick={()=>navigate('/settings')}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => navigate('/profile')}>

                <ListItemButton component="a">
                  <ListItemIcon>
                    <AccountBox />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>

              </ListItem>
              <ListItem disablePadding onClick={handleLogout}>

                <ListItemButton component="a">
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>

              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemIcon>
                    <ModeNight />
                  </ListItemIcon>
                  <Switch />
                </ListItemButton>
              </ListItem>
              
            </List>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar