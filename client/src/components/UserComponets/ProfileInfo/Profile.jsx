import React, { useState,useRef } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { CardActions, IconButton } from '@mui/material';
import { Box } from "@mui/material";
import UserPosts from '../Posts/UserPosts';
import { useSelector } from 'react-redux';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import  toast,{Toaster } from "react-hot-toast";
import axios from '../../../utils/axios'
import { ADD_PROFILEIMAGE } from '../../../utils/ConstUrls';
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  p: 4,
};



function Profile() {

  const [profilePicture, setProfilePicture] = useState("");
  const navigate=useNavigate();
  const uploadButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userName, bio, profilePic, coverPic, following, followers } = useSelector((state) => state?.user);
  const userId=useSelector((state)=>state.user._id)
  const handleChangeImg = (e)=>{
    setProfilePicture(e.target.files[0])
  }

  const handleImageSumbit = async (e) => {

   e.preventDefault();
   if(profilePicture ===""){
    return toast.error("oops cannot send null image")
   }
   uploadButtonRef.current.disabled = true;

   const formData=new FormData();
   formData.append('image',profilePicture);
   try{
    const token=document.cookie.slice(6)
     const response=await axios.post(`${ADD_PROFILEIMAGE}/${userId}`,formData,{ headers: {'Authorization':`Bearer ${token}` } })
    if(response.success){
      navigate('/profile')
    }else{
      alert(response.message)
    }
   }catch(err){
  console.log(err)
   }

  }

  return (
    <Box flex={6} >
      <Card sx={{ m: 4 }}>
        <CardMedia
          component="img"
          height="140"
          image={"https://wallpaperaccess.com/full/1493766.jpg"}
          alt="User Cover Photo"
          sx={{ position: 'relative' }}
        />
        <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Avatar
              alt="User profile picture"
              src={profilePic}
              sx={{ width: 101, height: 101 }}
            />
            <IconButton color="#212121" aria-label="upload picture" onClick={handleOpen} component="label" sx={{ position: "absolute", marginLeft: 8, marginTop: 10 }}>
              <PhotoCamera />
            </IconButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Upload
                </Typography>
                <form onSubmit={handleImageSumbit}>

                  <input accept="image/*" type="file" name="file" onChange={handleChangeImg} />
                  <Button variant="contained" size="small" ref={uploadButtonRef} type='submit' >
                    Upload
                  </Button>
                </form>
              </Box>
              
            </Modal>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6">{userName}</Typography>
              <Typography variant="body2">{bio}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 1 }}>
              <Typography variant="body2">Followers</Typography>
              <Typography variant="h6">{followers.length}</Typography>
            </Box>
            <Box sx={{ ml: 1 }}>
              <Typography variant="body2">Following</Typography>
              <Typography variant="h6">{following.length}</Typography>
            </Box>
          </Box>
        </CardActions>
      </Card>

      <UserPosts />
      <Toaster  position="top-right"
  reverseOrder={false} />
    </Box>
  )
}

export default Profile