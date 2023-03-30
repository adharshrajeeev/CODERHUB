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
import toast  from 'react-hot-toast';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function PostMenuButton({postId,postedUserId,userId}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [clickOpen,SetClickOpen]=useState(false)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClickOpen = () => {
        SetClickOpen(true);
      };
      const handleClickClose = () => {
        SetClickOpen(false);
      };

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
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClickOpen}>Delete</MenuItem>
        <Dialog
        open={clickOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Disagree</Button>
          <Button onClick={handleClickClose}>Agree</Button>
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
      <MenuItem onClick={handleClose}>Report</MenuItem>
      <MenuItem onClick={handleClose}>Save</MenuItem>
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