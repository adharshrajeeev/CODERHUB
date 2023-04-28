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
import React, {  useState } from "react";
import {
    Add as AddIcon,
} from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box } from "@mui/system";
import { useSelector,useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from '../../../utils/axios'
import { ADD_POST } from "../../../utils/ConstUrls";
import CircularProgress from '@mui/material/CircularProgress';
import { setExplorePosts, setHomePosts, setPosts } from '../../../redux/userSlice';
import noProfilePicture from '../../../assets/noProfilePicture.jpg'
import { useLocation } from "react-router-dom";
// import { fetchUserDetails } from "../../../api/UserServices";



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


    const [loading,setLoading]=useState(false)
    const [open, setOpen] = useState(false);
    const [isImage,setIsImage]=useState(false);
    const [images,setImage]=useState("");
    const [post,setPost]=useState("")
    const _id=useSelector((state)=>state.user?.user?._id)
    // const token=useSelector((state)=>state.token);
    const location=useLocation();
    const userName=useSelector((state)=>state.user?.user?.userName);
    const profilePic=useSelector((state)=>state.user?.user?.profilePic);
    const userImage=useSelector((state)=>state.user?.user?.profilePic)

    const dispatch=useDispatch();
    const handleChange=(e)=>{
      setImage(e.target.files[0])
      setIsImage(images.name)
    }
  
    const handleSubmit = async(e)=>{
      try{
        if(post.trim()==="" && isImage){
          return toast.error("Please fill the component")
        }
        
        setLoading(true)
      const formData=new FormData();
      formData.append("userId",_id);
      formData.append("content",post);
      formData.append("userName",userName)
      if(profilePic){

        formData.append("profilePic",profilePic)
      }else{
        formData.append("profilePic",noProfilePicture)
      }
      if(images){
        console.log(images,"iamge")
        formData.append('image',images)
      }
      const token=localStorage.getItem('token')

      const response=await axios.post(ADD_POST,formData,{ headers: {'Authorization':`Bearer ${token}` } });
      if(response.data.success){
        setLoading(false);
        if(location.pathname=='/home'){
          dispatch(setHomePosts(response.data.posts))
          console.log("home")
        }else if(location.pathname=='/explore'){
          dispatch(setExplorePosts(response.data.posts))
          console.log("explroe")
        }else{  
          console.log("profile")
          dispatch(setPosts(response.data.posts));
        }
        setIsImage("")
        setPost("")
        setOpen(false)

      }else{
        setIsImage("")
        setPost("")
        setOpen(false)
        setLoading(false);
        toast.error("oops something went wrong")
      }
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
                <span style={{fontSize:"15px"}} >{isImage && isImage }</span>
              </IconButton>
            </Stack>
            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
             {loading ?  <CircularProgress />
            : <Button onClick={handleSubmit}>Post</Button>}               
            </ButtonGroup>
          <Toaster  />
          </Box>
        </SytledModal>
          
      </>
    )
}

export default AddPostModal