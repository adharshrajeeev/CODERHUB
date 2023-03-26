import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
  } from "@mui/material";
  import Button from '@mui/material/Button';
  import React, { useEffect, useState } from "react";
import { FOLLOW_USER, SHOW_USERS, UNFOLLOW_USER } from "../../../utils/ConstUrls";
import axios from '../../../utils/axios'
import { useSelector } from "react-redux";
import  toast,{Toaster}  from "react-hot-toast";

function Suggestions() {

  const token=useSelector((state)=>state.token);
  const userId=useSelector((state)=>state.user._id)
  const [userList,SetUserList]=useState([])
  const getUserLists=async()=>{
    try{

      const response=await axios.get(SHOW_USERS,{ headers: {'Authorization':`Bearer ${token}` } });
      SetUserList(response.data);
      
    }catch(err){
      console.log("Oops somethingwent wrong")
    }
  }


  const handleFollow = async(e)=>{
   try{
      console.log(token,"toeknissss")
    
     const followerId=e.target.value;
     const body={
      userId,followerId
     }
     const response=await axios.post(FOLLOW_USER,body,{ headers: {'Authorization':`Bearer ${token}`,"Content-Type": "application/json" } });
    
     toast.success(response.data.message)
   }catch(err){
    console.log("error in following",err)
   }
  }


  const handleUnFollow=async(e)=>{
      try{
        const followerId=e.target.value;
        const body={
         userId,followerId
        }
        const response=await axios.post(UNFOLLOW_USER,body,{ headers: {'Authorization':`Bearer ${token}`,"Content-Type": "application/json" } })
      
        toast.success(response.data.message)
    }catch(err){
      console.log("Eroor in Unfollowing",err)
    }
  }

    useEffect(()=>{
        getUserLists();
    },[])

  return (
   
      <>
      <Typography variant="h6" fontWeight={100} mt={2}>
          People U may Know 
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {
            userList.map((users,index)=>{
              return (
                <>
                <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={users.userName} src={users.profilePic ? users.profilePic : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-library.com%2Ficon%2Fno-user-image-icon-3.html&psig=AOvVaw0Sk5AHaURvpA7Vxl0X7dO-&ust=1679733302736000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJjZhamU9P0CFQAAAAAdAAAAABAE"} />
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                       {users.userName} 
                      </Typography>
                      {/* {
                        unfollowed &&  <Button sx={{display:"flex"}} variant="contained" size="small" value={users._id} onClick={handleFollow} >Follow</Button>
                      
                      } */}
                   
                          
                          <Button sx={{display:"flex"}} variant="contained" size="small" value={users._id} onClick={handleFollow} >Follow</Button>
                      
                     
                   
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <Toaster  position="bottom-left"
          reverseOrder={false} />
              </>
              )
            })
          }
    </List>
      </>
  )
}

export default Suggestions