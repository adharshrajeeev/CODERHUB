import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import axios from '../../../utils/axios'
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast'
import { UPDATE_USER_POST } from '../../../utils/ConstUrls';
import { setPost } from '../../../redux/userSlice';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


function EditPostModal({ postId, postedUserId, userId, content, postImage, postVideo }) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editcontent, setEditContent] = useState(content);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [editImage, setEditImage] = useState(postImage);
  const [changedImage, setChangedImage] = useState(null)
  const [editVideo, setEditVideo] = useState(postVideo)
  const [changeedVideo, setChangedVideo] = useState(null)
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);


  const getPostDetailsOnOpen = () => {
    setOpen(true);
  }
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      // setEditImage(e.target.files[0]);
      setChangedImage(e.target.files[0])
    }

  }

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedVideo(e.target.files[0]);
      // setEditVideo(e.target.files[0])
      setChangedVideo(e.target.files[0])
    }
  }
  const handlePostSubmit = async () => {

    if (editcontent && editcontent.trim() === "") {
      return toast.error("please Fill the Component")
    }
    const token = localStorage.getItem('token');
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("postId", postId)
      if (editcontent) {

        formData.append("content", editcontent);
      }
      if (changedImage && (!editcontent || editcontent==null)) {
        formData.append('imageContent', true)
        console.log(editImage,"editImage da")
        formData.append('image', changedImage)
      }
      if (changedImage && editcontent) {
        formData.append("content", editcontent);
        formData.append('contentImg', true)
        formData.append('image', changedImage)
      }

      if (changeedVideo && (!editcontent || editcontent==null)) {
        console.log(changeedVideo,"changed field")
        formData.append('videoContent', true);
        formData.append("my-video", changeedVideo)
      }
      if (changeedVideo && editcontent) {
        formData.append("content", editcontent);
        formData.append('contentVideo', true)
        formData.append("my-video", changeedVideo)
      }

      axios.put(UPDATE_USER_POST, formData, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
        setOpen(false);
        setLoading(false);
        dispatch(setPost(response.data.post))
        toast.success("Success post updated Success fully")
      }).catch((err) => {
        setOpen(false);
        setLoading(false);
        toast.error("Oops Someting went wrong try again later");
      })
    } catch (err) {
      setOpen(false);
      setLoading(false);
      console.log(err)
      toast.error("Oops Someting went wrong try again later");

    }
  }

  return (
    <>
      <MenuItem onClick={getPostDetailsOnOpen} >Edit</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus={true}
      >
        <Box sx={style} borderRadius={5}>
          {/* <Stack direction="row"  spacing={2}> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={3}
              variant="standard"
              value={editcontent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </Typography>
          {editImage ? <img src={editImage} style={{ width: "100px", height: "100px", marginTop: "20px" }} alt="postImage" /> : null}
          {selectedImage && (
            <div >
              <img
                src={URL.createObjectURL(selectedImage)}
                style={{ width: "100px", height: "100px" }}
                alt="Thumb"
              />
            </div>
          )}
          {
            editImage ? <Button variant="contained" component="label">
              Change
              <input hidden accept="image/*" onChange={handleImageChange} multiple type="file" name="file" />
            </Button> : ""
          }

          {editVideo && !selectedVideo ? <video width="320" height="240" controls>
            <source src={editVideo} type="video/mp4" />
          </video> : null}
          {selectedVideo && (
            <div>
              <video width="320" height="240" controls>
                <source src={URL.createObjectURL(selectedVideo)} type="video/mp4" />
              </video>
            </div>
          )}
          {editVideo ? <Button variant="contained" component="label">
            Change
            <input hidden accept="video/*" onChange={handleVideoChange} multiple type="file" name="file" />
          </Button> : ""}
          <LoadingButton
            size="small"
            sx={{ marginTop: "50px", alignContent: "left" }}
            onClick={handlePostSubmit}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained" >
            <span>Post</span>
          </LoadingButton>
          {/* </Stack> */}
        </Box>
      </Modal>
      <Toaster />
    </>
  )
}

export default EditPostModal