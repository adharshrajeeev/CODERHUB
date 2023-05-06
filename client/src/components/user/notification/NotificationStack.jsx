import React,{ useState} from 'react'
import SnackbarContent from '@mui/material/SnackbarContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios  from '../../../utils/axios';
import moment from 'moment'
import { CHANGE_NOTIFICATION_STATUS } from '../../../utils/ConstUrls';


function NotificationStack({notification,userId,fetchAllNotifications}) {
    const [notificationColor,setNotificationColor]=useState({bgColor:"#dedede",fontColor:"black"});
    const token=localStorage.getItem('token')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const action = (
        <>
        <span>{moment(notification.date).fromNow()}</span>
        <MoreHorizIcon  aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}/>
        </>
      );

    const handleNotificationRead=async()=>{
        try{
            const res=await  axios.put(`${CHANGE_NOTIFICATION_STATUS}/${notification?._id}`,{},{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } })
            console.log(res.data)
            handleClose()
            setNotificationColor({bgColor:"white",fontColor:"black"})
            fetchAllNotifications();
        }catch(err){
            console.log(err.message)
        }
    }
     

  return (
    <>
    <SnackbarContent  message={`${notification?.senderId?.userName}   Liked you post`} action={action}  sx={{ backgroundColor: notification.read ? "white" : notificationColor.bgColor,
    color:notification?.read ? "black" : notificationColor.fontColor}} />
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
            !notification.read && 
        <MenuItem onClick={handleNotificationRead}>Mark as Read</MenuItem>
        }
        <MenuItem onClick={()=>setNotificationColor({bgColor:"white",fontColor:"black"})}>Delete Notification</MenuItem>
        {/* <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </>
  )
}

export default NotificationStack