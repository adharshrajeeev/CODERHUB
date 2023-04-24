import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import axios from '../../../utils/axios'
import { GET_USERDATA, UPDATE_USER_DETAILS } from '../../../utils/ConstUrls';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import toast, { Toaster } from 'react-hot-toast'
import FormLabel from '@mui/joy/FormLabel'; 
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import decodeToken from '../../../utils/Services';
import { useDispatch } from 'react-redux';
import { changeUserName } from '../../../redux/userSlice';

function PrimaryDetails() {


  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userPhoneNumber, setPhoneNumber] = useState("");
  const [userBio,setUserBio]=useState("")
  const [loading, setLoading] = useState(false);
  const [formError,setFormError]=useState({userNameError:false,
    userEmailError:false,userGenderError:false,userPhoneNumberError:false,
    userBioError:false})

  const dispatch = useDispatch();

  const getUserPrimaryData = async () => {
    const userId = decodeToken();
    const token = localStorage.getItem('token')
    axios.get(`${GET_USERDATA}?userId=${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {

      setUserName(response.data.userName);
      setUserEmail(response.data.email);
      setPhoneNumber(response.data.phoneNumber);
      setUserGender(response.data.gender);
      setUserEmail(response.data.email);
      setUserBio(response.data.userBio ? response.data.userBio : "")
    }).catch((err) => {
      console.log(err)
      toast.error("Oops Something went wrong")
    })
  }

  const handleDetailsChange = (field, data) => {
    if (field === 'userName') {
      if(data.trim()===""){
         setFormError({userNameError:true})
      }else{

        setFormError({userNameError:false})
      }
      setUserName(data)

    } else if (field === 'gender') {
      if (data.trim() === "") {
        setFormError({userGenderError:true})
      }else{
        setFormError({userGenderError:false})

      }
      setUserGender(data)
    }else if(field === 'Bio'){
      if(data.trim() ==="" || userBio.trim().length > 10){
        setFormError({userBioError:true})
      }else{
        setFormError({userBioError:false})

      }
      setUserBio(data)
    } 
    else {
      if(data.trim().length< 0 || data.trim().length > 10){
        setFormError({userPhoneNumberError:true})
      }else{
        setFormError({userPhoneNumberError:false})
        
      }
      setPhoneNumber(data)
    }
  }

  function handleSaveDetails() {
    if (userName === "" || userGender === "" || userPhoneNumber === "") {
      return toast.err("Please Fill the components")
    }
    setLoading(true)
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("gender", userGender);
    formData.append("phoneNumber", userPhoneNumber)
    formData.append("userBio",userBio)
    try {
      const userId = decodeToken();
      const token = localStorage.getItem('token')
      axios.post(`${UPDATE_USER_DETAILS}/${userId}`, formData, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" } }).then((response) => {
        setUserName(response.data.userName);

        dispatch(changeUserName(response?.data?.userName))
        setUserEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setUserGender(response.data.gender);
        setUserBio(response.data.userBio)
        toast.success("Save Success");
        setLoading(false)
      }).catch((err) => {
        setLoading(false)
        console.log(err)
        toast.error("Ops Something went wrong")
      })

    } catch (err) {
      console.log(err)
      setLoading(false)
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
          <Input placeholder="Name" type='text' value={userName} onChange={(e) => handleDetailsChange("userName", e.target.value)} />
          {formError.userNameError  && <p style={{ color: "red" }}>Name Field is Required</p>}
        </Grid>
        <Grid xs={6}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" value={userEmail} disabled />
        </Grid>
        <Grid xs={4}>
          <FormLabel>Gender</FormLabel>
          <Input placeholder="Gender" type='text' value={userGender} onChange={(e) => handleDetailsChange("gender", e.target.value)} />
          {formError.userGenderError && <p style={{ color: "red" }}>Gender Field is Required</p>}
        </Grid>
        <Grid xs={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input placeholder="Phone Number" type='number' value={userPhoneNumber} onChange={(e) => handleDetailsChange("phoneNumber", e.target.value)} />
          {formError.userPhoneNumberError  && <p style={{ color: "red" }}>Phone Field is Required</p>}
        </Grid>
        <Grid xs={4}>
          <FormLabel>User Bio</FormLabel>
          <Input placeholder="Bio" type='text' value={userBio} onChange={(e) => handleDetailsChange("Bio", e.target.value)} />
          {formError.userBioError  && <p style={{ color: "red" }}>Bio Field is Required(Max char 10)</p>}
        </Grid>
        <Grid xs={12}>
          <LoadingButton
            color="primary"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            <span typeof='button' onClick={handleSaveDetails}>Save</span>
          </LoadingButton>
        </Grid>
      </Grid>

      <Toaster />
    </Box>
  )
}

export default PrimaryDetails