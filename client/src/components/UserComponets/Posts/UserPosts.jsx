import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from '../../../utils/axios'
import { Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography, } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector } from "react-redux";
import { SHOW_USER_POST } from "../../../utils/ConstUrls";

const UserPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
 

  const userId = useSelector((state) => state.user._id);
  const userImage = useSelector((state) => state.user?.profilePic)
  const token = useSelector((state) => state.token)

  setTimeout(() => {
    setLoading(false);
  }, [3000]);



  const getUserPosts = async () => {
    const token = document.cookie.slice(6)

    try {

      const response = await axios.get(`${SHOW_USER_POST}/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })

      setPosts(response.data)
    } catch (err) {
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
          {posts.map((post, index) => {
            return (
              <Card key={index} sx={{ margin: 5 }}>
                <CardHeader
                  avatar={
                    <Avatar src={userImage}>
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
                  post.image ? <CardMedia
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
                    <Badge color="primary">
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite sx={{ color: "red" }} />}
                        value={post._id}  />
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

export default UserPosts;