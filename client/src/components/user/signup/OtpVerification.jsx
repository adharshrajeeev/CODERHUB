import React, { useState } from 'react'
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { verifyOtpRequest } from '../../../api/UserServices';

function OtpVerification({userId}) {

    const [OTP,setOTP]=useState("");
    const [formError,setFormError]=useState({otpError:false})
    const navigate=useNavigate();

    const handleOtpChange = (data)=>{
        if(data?.trim()==="" || data?.trim().length !==5){
          setFormError({otpError:true})
        }else{
          setFormError({otpError:false})
        }
        setOTP(data)
      }

    const handleOtpSubmit = async (e)=>{
        e.preventDefault();
      
        const body={
            OTP,
           userId
        }
        try{
          await verifyOtpRequest(body)
          navigate('/',{state:{message:"Signup done successfully"}})

        }catch(err){

          setOTP("")
          toast.error(err.response.data.message)
          console.log(err)
        }
      
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
        <Typography component="h3" variant="h5">
          EMAIL VERIFICATION
        </Typography>
        <Box component="form"  sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <TextField

                fullWidth
                id="otp"
                label="ENTER 5 DIGIT OTP"
                name="otp"
               type='number'
               onChange={(e) => handleOtpChange(e.target.value)} 
              />
            {formError.otpError && <Typography varient="caption" style={{color:"red"}}>Please enter valid Otp</Typography>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={formError.otpError}
            variant="contained"
            onClick={(e)=>handleOtpSubmit(e)} 
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

export default OtpVerification