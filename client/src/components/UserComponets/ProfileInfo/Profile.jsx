import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';  
import {  CardActions ,IconButton} from '@mui/material';
import { Box } from "@mui/material";
import AllPosts from '../../../components/UserComponets/ExplorePosts/AllPosts';


const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function Profile() {
  return (
    <Box flex={6} >
      <Card sx={{ m: 4 }}>
  <CardMedia
    component="img"
    height="140"
    image="https://wallpaperaccess.com/full/1493766.jpg"
    alt="green iguana"
    sx={{ position: 'relative' }}
  />
  <IconButton sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}>
    <EditIcon />
  </IconButton>
  <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar alt="Edit" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" />
        }
      >
        <Avatar
          alt="User profile picture"
          src="https://randomuser.me/api/portraits/women/65.jpg"
          sx={{ width: 101, height: 101 }}
        />
      </Badge>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h6">Username</Typography>
        <Typography variant="body2">Some bio text</Typography>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}> 
      <Box sx={{ mr: 1 }}>
        <Typography variant="body2">Followers</Typography>
        <Typography variant="h6">1000</Typography>
      </Box>
      <Box sx={{ ml: 1 }}>
        <Typography variant="body2">Following</Typography>
        <Typography variant="h6">200</Typography>
      </Box>
    </Box>
  </CardActions>
</Card>

      <AllPosts />
    </Box>
  )
}

export default Profile