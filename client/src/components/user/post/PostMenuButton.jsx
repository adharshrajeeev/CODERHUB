import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import axios from '../../../utils/axios';
import {useDispatch} from 'react-redux'
import EditPostModal  from '../modals/EditPostModal'
import { DELETE_POSTS } from '../../../utils/ConstUrls';
import { setPosts } from '../../../redux/userSlice';
import PostReportModal from '../modals/ReportPostModal';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function PostMenuButton({postId,postedUserId,userId,content,postImage}) {

    const dispatch=useDispatch();
    const [anchorEl, setAnchorEl] = useState(false);
    const [clickOpen,SetClickOpen]=useState(false)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(false);
    };

    const handleClickOpen = () => {
        SetClickOpen(true);
      };
      const handleClickClose = () => {
        SetClickOpen(false);
       
      };

    const handleDeletePost = async ()=>{
        try{
          const token =localStorage.getItem('token')
         const response=await axios.delete(`${DELETE_POSTS}/${postId}`,{ headers: { 'Authorization': `Bearer ${token}` } }) ;
          dispatch(setPosts(response.data.posts))
         handleClickClose();
         handleClose();
         
        }catch(err){
            console.log(":userpost delete error",err)
        }
    }  

  return (
   <>
    {
        postedUserId===userId ? <Menu
        id="basic-menu"
        anchorEl={anchorEl} 
        open={open}
        onClose={handleClose}   
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       <EditPostModal postId={postId} postedUserId={postedUserId} userId={userId} content={content} postImage={postImage}/>
  
        <MenuItem onClick={handleClickOpen}>Delete</MenuItem>
        <Dialog
        open={clickOpen}
        TransitionComponent={Transition} 
        keepMounted
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{color:"red"}}>{"Are you sure to delete post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{color:'black'}}>
            Once Post deleted Cannot be retreived!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleDeletePost}>Accept</Button>
        </DialogActions>
      </Dialog>
      </Menu> :
      <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <PostReportModal postId={postId} postedUserId={postedUserId} userId={userId} />
    </Menu>
    }
    
   <MoreHorizIcon   id="basic-button"
  aria-controls={open ? 'basic-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}
  disableBackdropClick
  onClick={handleClick}/>
  

   </>
  )
}

export default PostMenuButton