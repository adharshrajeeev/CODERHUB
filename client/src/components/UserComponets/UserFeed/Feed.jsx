import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState,useEffect } from "react";
import axios from '../../../utils/axios'
import { ALL_POSTS } from "../../../utils/ConstUrls";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [posts,setPosts]=useState([]);

  const userId=useSelector((state)=>state.user._id)
  setTimeout(() => {
    setLoading(false);
  }, [2000]);

  const getUserPosts= async()=>{
    const token=document.cookie.slice(6)
  
    try{
    
      const response=await axios.get(`${ALL_POSTS}/${userId}`,{ headers: {'Authorization':`Bearer ${token}` } })
      
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
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={post.postedUser}
            subheader={post.createdAt}
          />
          <CardMedia
            component="img"
            height="20%"
            image={post?.image?.url}
            alt="userposts"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {
                post.content
              }
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
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

export default Feed;