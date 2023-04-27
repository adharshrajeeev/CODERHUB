import React, { useState } from 'react'
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, Link } from "react-router-dom";
import axios from '../../../utils/axios'
import toast, { Toaster } from 'react-hot-toast';
import { OTP_AND_RESET_PASS } from '../../../utils/ConstUrls';



function OtpSubmit({userId}) {

  const [OTP,setOTP]=useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formError,setFormError]=useState({otpError:false,passwordError:false})
  const navigate=useNavigate();

  const handleOtpChange = (data)=>{
    if(data?.trim()==="" || data?.trim().length !==5){
      setFormError({otpError:true})
    }else{
      setFormError({otpError:false})
    }
    setOTP(data)
  }

  const handlePasswordChange = (data) => {
    if (data?.trim() === "" || data?.trim().length < 5) {
      setFormError({passwordError:true})
    } else {
      setFormError({passwordError:true})
    }
    setNewPassword(data)
  }

  const handleResetSubmit = async(e)=>{
    e.preventDefault();
    const body=JSON.stringify({
      newPassword,
      userId,
      OTP
    })

    axios.post(OTP_AND_RESET_PASS,body,{headers:{"Content-Type":"application/json"}}).then((response)=>{
      console.log(response,"respose reset")
      navigate('/',{state:{message:"Password reset sucessfully"}})
    }).catch((err)=>{
      console.log(err)
      setNewPassword("");
      setOTP("")
      toast.error(err.response.data.message)
    })
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>CODERHUB</h1> <CodeIcon />
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>
        <Box component="form"  sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <TextField

                fullWidth
                id="otp"
                label="Otp"
                name="otp"
               type='number'
               onChange={(e) => handleOtpChange(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField

                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={(e)=>handleResetSubmit(e)} 
            sx={{ mt: 3, mb: 2, color: "white", background: "black" }}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>
      <Toaster position="top-center"
        reverseOrder={false} />
    </Container>
  )
}

export default OtpSubmit