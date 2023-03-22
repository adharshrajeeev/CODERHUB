import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState,useEffect } from "react";
// import Post from "./Post";
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

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [posts,setPosts]=useState([])
  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  const getUserPosts= async()=>{
    const token=document.cookie.slice(7)
    try{

      const response=await axios.get(`${ALL_POSTS}/641538977258dcf835989557`,{ headers: {'Authorization':`Bearer ${token}` } })
      console.log(response)
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
            alt="Paella dish"
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