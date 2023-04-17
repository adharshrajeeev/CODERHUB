import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from '../../../utils/axios'
import { GET_USERDATA, GET_USER_DETAILS } from '../../../utils/ConstUrls';
import toast,{Toaster} from 'react-hot-toast'
import decodeToken from '../../../utils/Services';

function PrimaryDetails() {

    const [userDetails,setUserDetails]=useState({});
    const [userName,setUserName]=useState("")
    
    const getUserPrimaryData =  async ()=>{ 
        const userId=decodeToken();
        const token=localStorage.getItem('token')
        axios.get(`${GET_USERDATA}?userId=${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response)=>{
            console.log(response.data)
            setUserName(response.data.userName)
            setUserDetails(response.data);
            console.log(userDetails,"this is userdara")
        }).catch((err)=>{ 
            toast.error("Oops Something went wrong")
        })
    }

    useEffect(()=>{
        getUserPrimaryData();
    },[])

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
       
        <TextField  required
          id="outlined-required"
         value={userName} size="small"/>
        <TextField label="Email" id="outlined-size-small" defaultValue={userDetails?.email} size="small"/>
      </div>
      <div>
      <TextField label="Size" id="outlined-size-small" defaultValue="Small" size="small"/>
      <TextField label="Size" id="outlined-size-small" defaultValue="Small" size="small"/>
      </div>
      <div>
      <TextField label="Size" id="outlined-size-small" defaultValue="Small" size="small"/>
      <TextField label="Size" id="outlined-size-small" defaultValue="Small" size="small"/>
      </div>
    </Box>
  )
}

export default PrimaryDetails