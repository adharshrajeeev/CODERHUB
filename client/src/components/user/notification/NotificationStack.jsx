import React,{ useState} from 'react'
import SnackbarContent from '@mui/material/SnackbarContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deleteNotification, updateNotification } from '../../../redux/userSlice';
import { changeNotificationStatus, deleteUserNotification } from '../../../api/UserServices';


function NotificationStack({notification,userId,fetchAllNotifications}) {
    const [notificationColor,setNotificationColor]=useState({bgColor:"#dedede",fontColor:"black"});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch=useDispatch();
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
            const res=await  changeNotificationStatus(notification._id)
            handleClose()
            setNotificationColor({bgColor:"white",fontColor:"black"})
            dispatch(updateNotification(res.data))
          
        }catch(err){
            console.log(err.response.data.message)
        }
    }
    
    const handleDeleteNotification = async ()=>{
      try{
        await deleteUserNotification(notification._id)
        handleClose()
        dispatch(deleteNotification(notification?._id))
      
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
        <MenuItem onClick={handleDeleteNotification}>Delete Notification</MenuItem>
      </Menu>
    </>
  )
}

export default NotificationStack