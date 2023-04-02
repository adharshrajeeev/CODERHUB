import {
    Avatar,
    Button,
    ButtonGroup,
    Modal,
    Stack,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from '../../../utils/axios'
import { ADD_POST, GET_EDITPOST_DETAILS } from "../../../utils/ConstUrls";
import CircularProgress from '@mui/material/CircularProgress';
import { getPostDetails, setPosts } from '../../../redux/userSlice';


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




function  EditPostModal({postId,userId}) {

   
    

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [images, setImage] = useState("");
    const [post, setPost] = useState("")
    const { _id } = useSelector((state) => state.user.user)
    const userName = useSelector((state) => state.user.user.userName);
    const profilePic = useSelector((state) => state.user.user.profilePic);
    const userImage = useSelector((state) => state.user?.user.profilePic);
    const [editPost,setEditPost]=useState(null);

    // const getEditPostDetail = async()=>{

    //     try{
    //         const token=document.cookie.slice(6)
    //         const {data}= await axios.get(`${GET_EDITPOST_DETAILS}/${postId}`,{ headers: {'Authorization':`Bearer ${token}` } });
    //         console.log(data.postDetails,"thissis is edit")
    //         setEditPost(data.postDetails)
    //     }catch(err){
    //         console.log("get edit post aerrror",err)  
    //     }
    // }
    
    // useEffect(()=>{
    //     getEditPostDetail(); 
    // },[postId])

    const dispatch = useDispatch();
    const handleChange = (e) => {
        setImage(e.target.files[0])
        setIsImage(images.name)
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            if (post === "") {
                return toast('Please Fill the components!',
                    {

                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
            }
            const formData = new FormData();
            formData.append("userId", _id);
            formData.append("content", post);
            formData.append("userName", userName)
            formData.append("profilePic", profilePic)
            if (images) {
                console.log(images, "iamge")
                formData.append('image', images)
            }
            const token = document.cookie.slice(6)

            const response = await axios.post(ADD_POST, formData, { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.data.success) {
                setLoading(false);
                dispatch(setPosts(response.data.posts));
                setIsImage("")
                setPost("")
                setOpen(false)

            } else {
                setIsImage("")
                setPost("")
                setOpen(false)
                setLoading(false);
                toast.error("oops something went wrong")
            }
        } catch (err) {
            toast.error("oops something went wrong")
        }
    }


    return (
        <>
            <MenuItem onClick={(e) => setOpen(true)}>Edit</MenuItem>
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
                        Edit Post
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
                        value={editPost.content}
                        onChange={(e) => setPost(e.target.value)}
                    />
                    <Stack direction="row" gap={1} mt={2} mb={3}>
                        <IconButton color="primary" aria-label="upload picture" component="label">

                            <input hidden accept="image/*" type="file" name="file" onChange={handleChange} />
                            <PhotoCamera />
                            <span style={{ fontSize: "15px" }} >{isImage && isImage}</span>
                        </IconButton>
                    </Stack>
                    <ButtonGroup
                        fullWidth
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        {loading ? <CircularProgress />
                            : <Button onClick={handleSubmit}>Post</Button>}
                    </ButtonGroup>
                </Box>
            </SytledModal>
            <Toaster position="top-right"
                reverseOrder={false} />
        </>
    )
}

export default EditPostModal