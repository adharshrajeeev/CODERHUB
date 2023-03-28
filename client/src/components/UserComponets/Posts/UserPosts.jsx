import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect, Fragment } from "react";
import axios from '../../../utils/axios'
import { Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography, } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
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
  }, [1000]);
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handlePostOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


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
                    <IconButton aria-label="settings"  onClick={handlePostOptions}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}>
                      <MoreVert />
                    </IconButton>
                  }
                  title={post.userName}
                  subheader={post.createdAt}
                />
                <Fragment>
                <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> EditPost
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
                </Fragment>
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