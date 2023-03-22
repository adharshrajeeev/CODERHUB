import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState,useEffect } from "react";
// import Post from "./Post";
import axios from '../../../utils/axios'
import { ALL_POSTS } from "../../../utils/ConstUrls";

const Feed = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  const getUserPosts= async()=>{
    const token=document.cookie.slice(7)
    try{

      const response=await axios.get(`${ALL_POSTS}/641538977258dcf835989557`,{ headers: {'Authorization':`Bearer ${token}` } })
      console.log(response)
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
          {/* <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post /> */}
        </>
      )}
    </Box>
  );
};

export default Feed;