import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import axios from '../../../utils/axios'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { UPDATE_USER_POST } from '../../../utils/ConstUrls';

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


function EditPostModal({postId,postedUserId,userId,content,postImage}) {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editcontent,setEditContent]=useState(content);
    const [editImage,setEditImage]=useState(postImage);
    const handleClose = () => setOpen(false);
    

    const getPostDetailsOnOpen = ()=>{
        setOpen(true);
    }

    const handlePostSubmit = async()=>{
        console.log(postId,"post id daaa")
        const token=localStorage.getItem('token');
        try{
            const formData=new FormData();
            formData.append("content",editcontent);
            formData.append("userId",userId);
            formData.append("postId",postId)
            if(editImage){
                console.log(editImage,"iamge")
                formData.append('image',editImage)
              }
            axios.put(UPDATE_USER_POST,formData,{ headers: {'Authorization':`Bearer ${token}` } }).then((response)=>{
                console.log(response,"post repose")
            }).catch((err)=>{
                console.log("edit post ",err)
            })
        }catch(err){

        }
    }
 
  return (
    <>
     <MenuItem  onClick={getPostDetailsOnOpen} >Edit</MenuItem>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}  borderRadius={5}>
        {/* <Stack direction="row"  spacing={2}> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={3}
              variant="standard"   
              value={editcontent}
              onChange={(e)=>setEditContent(e.target.value)}
            />
          </Typography>
        {editImage ?  <img src={editImage} style={{width:"100px",height:"100px",marginTop:"20px"}} alt="postImage" /> : ""} 
       {
        editImage ? <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button> : ""
       }
          <LoadingButton
            size="small"
            sx={{marginTop:"50px",alignContent:"left"}}
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
    </>
  )
}

export default EditPostModal