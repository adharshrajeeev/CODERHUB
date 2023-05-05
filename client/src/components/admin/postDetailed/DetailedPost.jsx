import React, { useEffect, useState } from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { useParams } from 'react-router-dom';
import axios from '../../../utils/axios'
import { GET_POST_DETAILS } from '../../../utils/ConstUrls';
import { adminConfig } from '../../../utils/Services';
import moment from 'moment'

function DetailedPost() {

    const {postId}=useParams();
    const [postDetails,setPostDetails]=useState(null)

    const fetchPostDetails = async()=>{
        try{

            const res = await axios.get(`${GET_POST_DETAILS}/${postId}`,adminConfig)
            console.log(res.data)
            setPostDetails(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchPostDetails()
    },[postId])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Card variant="outlined" sx={{ width: 520 }}>
    {
        postDetails?.image?.url && 
    <CardOverflow>
      <AspectRatio ratio="2">
        <img
          src="postDetails?.image?.url"
          alt=""
        />
      </AspectRatio>
    </CardOverflow>
    }
   {
    postDetails?.videoUrl && 
    <CardOverflow>
      <AspectRatio ratio="2">
      <video
            autoPlay
            loop
            muted
            // poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source
              src={postDetails?.videoUrl}
              type="video/mp4"
            />
          </video>
      </AspectRatio>
    </CardOverflow>
    }

    <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
     {postDetails?.postedUser?.userName}
    </Typography>
    <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
      {postDetails?.content && postDetails?.content}
    </Typography>
    <Divider />
    <CardOverflow
      variant="soft"
      sx={{
        display: 'flex',
        gap: 1.5,
        py: 1.5,
        px: 'var(--Card-padding)',
        bgcolor: 'background.level1',
      }}
    >
      <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
        {postDetails?.likes?.length} Likes
      </Typography>
      <Divider orientation="vertical" />
      <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
      {moment(postDetails?.createdAt).fromNow()}
      </Typography>
    </CardOverflow>
  </Card>
  </div>
  )
}

export default DetailedPost