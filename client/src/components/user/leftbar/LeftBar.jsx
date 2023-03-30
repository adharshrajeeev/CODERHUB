import React from 'react'
import {
  AccountBox,
  Home,
  Article,
  ModeNight,
  Person,
  Settings,
  Message
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton, 
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import './LeftBarStyle.scss' 
import { useNavigate } from 'react-router-dom';
import AddPostModal from '../modals/AddPostModal';




function LeftBar() {

  const navigate=useNavigate();


  return (
    <div className="leftBar">
    <div className="container">
      <div className="menu">  
        {/* <div className="user">
          
          <span>adharsh</span>
        </div> */}
        <div className="item">
        <List sx={{ width: '100%', maxWidth: 360,color:"black"}}>
        <ListItem > 

           <AddPostModal/>
   
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={()=>navigate('/home')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={()=>navigate('/explore')}>
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
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Message />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={()=>navigate('/profile')}>
             
            <ListItemButton component="a">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
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
        {/* <div className="item">
          <img src={Groups} alt="" />
          <span>Groups</span>
        </div>
        <div className="item">
          <img src={Market} alt="" />
          <span>Marketplace</span>
        </div>
        <div className="item">
          <img src={Watch} alt="" />
          <span>Watch</span>
        </div>
        <div className="item">
          <img src={Memories} alt="" />
          <span>Memories</span>
        </div>
      </div>
      <hr />
      <div className="menu">
        <span>Your shortcuts</span>
        <div className="item">
          <img src={Events} alt="" />
          <span>Events</span>
        </div>
        <div className="item">
          <img src={Gaming} alt="" />
          <span>Gaming</span>
        </div>
        <div className="item">
          <img src={Gallery} alt="" />
          <span>Gallery</span>
        </div>
        <div className="item">
          <img src={Videos} alt="" />
          <span>Videos</span>
        </div>
        <div className="item">
          <img src={Messages} alt="" />
          <span>Messages</span>
        </div>
      </div>
      <hr />
      <div className="menu">
        <span>Others</span>
        <div className="item">
          <img src={Fund} alt="" />
          <span>Fundraiser</span>
        </div>
        <div className="item">
          <img src={Tutorials} alt="" />
          <span>Tutorials</span>
        </div>
        <div className="item">
          <img src={Courses} alt="" />
          <span>Courses</span>
        </div> */}
      </div>
    </div>
  </div>
  )
}

export default LeftBar