import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import axios from '../../../utils/axios'
import { GET_USERDATA, GET_USER_DETAILS, UPDATE_USER_DETAILS } from '../../../utils/ConstUrls';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import toast, { Toaster } from 'react-hot-toast'
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import decodeToken from '../../../utils/Services';

function PrimaryDetails() {

  const [userDetails, setUserDetails] = useState("");
  const [userName,setUserName]=useState("");
  const [userEmail,setUserEmail]=useState("");
  const [userGender,setUserGender]=useState("");
  const [userPhoneNumber,setPhoneNumber]=useState("");
  const [loading, setLoading] = useState(false);

 
 
  const getUserPrimaryData = async () => {
    const userId = decodeToken();
    const token = localStorage.getItem('token')
    axios.get(`${GET_USERDATA}?userId=${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
  
      setUserName(response.data.userName);
          setUserEmail(response.data.email);
          setPhoneNumber(response.data.phoneNumber);
          setUserGender(response.data.gender);
          setUserEmail(response.data.email)
    }).catch((err) => {
      toast.error("Oops Something went wrong")
    })
  }

  const handleDetailsChange = (field,data)=>{
    if(field==='userName'){
    
      setUserName(data)
    }else if(field==='gender'){
     setUserGender(data)
      if(userGender.trim()===""){
        return toast.error("Gender is Mandatory")
      }
    }else{
      setPhoneNumber(data)
    }
  }

  function handleSaveDetails(){
    if(userName==="" || userGender === "" || userPhoneNumber === ""){
      return toast.err("Please Fill the components")
    }
    setLoading(true)
    const formData=new FormData();
    formData.append("userName",userName);
    formData.append("gender",userGender);
    formData.append("phoneNumber",userPhoneNumber)
    try{
      const userId=decodeToken();
      const token=localStorage.getItem('token')
      axios.post(`${UPDATE_USER_DETAILS}/${userId}`,formData,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json" } }).then((response)=>{
          setUserName(response.data.userName);
          setUserEmail(response.data.email);
          setPhoneNumber(response.data.phoneNumber);
          setUserGender(response.data.gender);
          toast.success("Save Success");
          setLoading(false)
      }).catch((err)=>{
        toast.error("Ops Something went wrong")
      })    

    }catch(err){
      toast.error("Ops Something went wrong")
    }
    
  }

  useEffect(() => {
    getUserPrimaryData();
  }, [])

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > 

        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={6}>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Name" type='text' value={userName} onChange={(e)=>handleDetailsChange("userName",e.target.value)} />
            {userName==="" && <p style={{color:"red"}}>Name Field is Required</p>}
          </Grid>
          <Grid xs={6}>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" value={userEmail}   disabled/>
          </Grid>
          <Grid xs={4}>
            <FormLabel>Gender</FormLabel>
            <Input placeholder="Gender" type='text' value={userGender} onChange={(e)=>handleDetailsChange("gender",e.target.value)} />
            {userGender==="" && <p style={{color:"red"}}>Gender Field is Required</p>}
          </Grid>
          <Grid xs={8}>
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder="Phone Number" type='number'  value={userPhoneNumber} onChange={(e)=>handleDetailsChange("phoneNumber",e.target.value)}  />
            {userPhoneNumber==="" && <p style={{color:"red"}}>Phone Field is Required</p>}
          </Grid>
          <Grid xs={12}>
          <LoadingButton
          color="primary"
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span onClick={handleSaveDetails}>Save</span>
        </LoadingButton>
          </Grid>
        </Grid>

      <Toaster />
    </Box>
  )
}

export default PrimaryDetails