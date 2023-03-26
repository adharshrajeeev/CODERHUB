import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState,useEffect } from "react";
import axios from '../../../utils/axios'
import { Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import {Avatar,Card,CardActions,CardContent, CardHeader,CardMedia,Checkbox,IconButton, Typography,} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector } from "react-redux";
import { EXPLORE_ALLPOST, GET_LIKCOUNT, LIKE_POST, UNLIKE_POST } from "../../../utils/ConstUrls";

const AllPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts,setPosts]=useState([]);
  const [liked,setLiked]=useState(false);
  const [likeCount,setLikeCount]=useState(0);
 
  const userId=useSelector((state)=>state.user._id)
  const userImage=useSelector((state)=>state.user?.profilePic)
  const token=useSelector((state)=>state.token)
  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  const handleLikePost=async(e)=>{
    try{
     
      // console.log(e.target.value,"this is like post id")
      console.log(token)
      console.log("LIKE")
        setLiked(true)
        const postId=e.target.value;
       const response=await axios.post(`${LIKE_POST}?postId=${postId}&userId=${userId}`,{ headers: {'Authorization':`Bearer ${token}` } });
     const likeresponse=await  axios.get(`${GET_LIKCOUNT}/${postId}`,{ headers: {'Authorization':`Bearer ${token}` } });
     setLikeCount(prev=>prev+1)
    }catch(err){
      console.log("Liked ERROR",err)
    }
  }

  const handleUnlikePost=async(e)=>{
    try{
      console.log("unlike")
      setLiked(false);
      const postId=e.target.value;
      const response=await axios.post(`${UNLIKE_POST}?postId=${postId}&userId=${userId}`,{ headers: {'Authorization':`Bearer ${token}` } })
      console.log(response)
      // const likeresponse=await  axios.get(`${GET_LIKCOUNT}/${postId}`,{ headers: {'Authorization':`Bearer ${token}` } });
      setLikeCount(prev=>prev-1)
    }catch(err){
      console.log("unliedk error",err);
    }
  }

  const getUserPosts= async()=>{
    const token=document.cookie.slice(6)

    try{

      const response=await axios.get(EXPLORE_ALLPOST,{ headers: {'Authorization':`Bearer ${token}` } })
    
     setPosts(response.data)
    }catch(err){
        console.log(err)
    }
  } 
  useEffect(() => {
    getUserPosts();
  }, [])
  

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
        { posts.map((post,index)=>{
         return (
         <Card key={index} sx={{ margin: 5 }}>
          <CardHeader
            avatar={
              <Avatar  src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-library.com%2Ficon%2Fno-user-image-icon-3.html&psig=AOvVaw0Sk5AHaURvpA7Vxl0X7dO-&ust=1679733302736000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJjZhamU9P0CFQAAAAAdAAAAABAE"}>
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={post.userName}
            subheader={post.createdAt}
          />
          {
            post.image ?  <CardMedia
            component="img"
            height="20%"
            image={post?.image?.url}
            alt="user posts"
          /> : ""
          }
          {/* <CardMedia
            component="img"
            height="20%"
            image={post?.image?.url}
            alt="user posts"
          /> */}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {
                post.content
              }
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Like"  >
            <Badge  color="primary">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              value={post._id} onClick={liked ? handleUnlikePost : handleLikePost} />
               </Badge>
            </IconButton>
            <IconButton aria-label="comments">
              <CommentIcon />
            </IconButton>
          </CardActions>
        </Card>)
        })
          
        }
           
        </>
      )}
    </Box>
  );
};

export default AllPosts;