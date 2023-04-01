import {
    Avatar,
    Button,
    ButtonGroup,
    Fab,
    Modal,
    Stack,
    styled,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
    Add as AddIcon,
} from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from '../../../utils/axios'
import { ADD_POST } from "../../../utils/ConstUrls";
import { useNavigate } from "react-router-dom";


const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});;




function AddPostModal() {


    const [open, setOpen] = useState(false);
    const [isImage,setIsImage]=useState(false);
    const [images,setImage]=useState("");
    const [post,setPost]=useState("")
    const {_id}=useSelector((state)=>state.user.user)
    // const token=useSelector((state)=>state.token);
    const userName=useSelector((state)=>state.user.user.userName);
    const profilePic=useSelector((state)=>state.user.user.profilePic);
    const userImage=useSelector((state)=>state.user?.user.profilePic)
 
    const navigate=useNavigate();
  
    const handleChange=(e)=>{
      setImage(e.target.files[0])
    }
  
    const handleSubmit = async(e)=>{
  
      try{
        if(post===""){
         return  toast('Please Fill the components!',
         {
           
           style: {
             borderRadius: '10px',
             background: '#333',
             color: '#fff',
           },
         }
       )
        }
      const formData=new FormData();
      formData.append("userId",_id);
      formData.append("content",post);
      formData.append("userName",userName)
      formData.append("profilePic",profilePic)
      if(images){
        formData.append('image',images)
      }
    const token=document.cookie.slice(6)

      const response=await axios.post(ADD_POST,formData,{ headers: {'Authorization':`Bearer ${token}` } });
      console.log(response,"this is response");
      
      setOpen(false)
      }catch(err){
        toast.error("oops something went wrong")
      }
    }


    return (
        <>
        <Tooltip
          onClick={(e) => setOpen(true)}
          title="add post"
          sx={{
            position: "fixed",
            bottom: 20,
            left: { xs: "calc(50% - 25px)", md: 30 },
          }}
        >
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Tooltip>
        <SytledModal
          open={open}
          onClose={(e) => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={400}
            height={280}
            bgcolor={"white"}
            color={"text.primary"}
            p={3}
            borderRadius={5}
          >
            <Typography variant="h6" color="gray" textAlign="center">
              Create post
            </Typography>
            <UserBox>
              <Avatar 
                src={userImage ? userImage : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-library.com%2Ficon%2Fno-user-image-icon-3.html&psig=AOvVaw0Sk5AHaURvpA7Vxl0X7dO-&ust=1679733302736000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJjZhamU9P0CFQAAAAAdAAAAABAE"}
                sx={{ width: 30, height: 30 }}
              />
              <Typography fontWeight={500} variant="span">
               {userName}
              </Typography>
            </UserBox>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={3}
              placeholder="What's on your mind?"
              variant="standard"
              value={post}
              onChange={(e)=>setPost(e.target.value)}
            />
            <Stack direction="row" gap={1} mt={2} mb={3}>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" name="file" onChange={handleChange} />
                <PhotoCamera />
              </IconButton>
            </Stack>
            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={handleSubmit}>Post</Button>
            </ButtonGroup>
          </Box>
        </SytledModal>
          <Toaster  position="top-right"
    reverseOrder={false} />
      </>
    )
}

export default AddPostModal