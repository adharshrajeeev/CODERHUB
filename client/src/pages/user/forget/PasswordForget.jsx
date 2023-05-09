import React, { useState } from 'react'
import CodeIcon from '@mui/icons-material/Code';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import toast, { Toaster } from 'react-hot-toast';
import OtpSubmit from '../../../components/user/forgotPassword/OtpSubmit';
import { sendOtpRequest } from '../../../api/UserServices';


function PasswordForget() {

    const [email,setEmail]=useState("");
    const [formError,setFormError]=useState(false);
    const [otpComponent,setOtpComponent]=useState(false)
    const [loading, setLoading] = useState(false);
    const [userId,setUserId]=useState("")


    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
    const handleEmailChange = (data)=>{
        
        if(data.trim()===""){
            setFormError(true)
        }else if(!isValidEmail(data)){
            setFormError(true)
        }else{
            setFormError(false)

        }
        setEmail(data)
    }


    const handleSendOtp = async()=>{
        setLoading(true);
        const body={
            email
        }
        try{
            const response=await sendOtpRequest(body)
            setUserId(response.data.userId)
            setLoading(false);
            setOtpComponent(true);
            toast.success(response.data.message)
            }catch(err){
          setLoading(false);
          toast.error(err.response.data.message)
            console.log(err)
        }
    }
  return(
    <>
    {
        otpComponent ? <OtpSubmit userId={userId}/> :
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
          Forget Password
          </Typography>
          <Box component="form"  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                  <Typography variant='caption'>Enter Email To send Otp</Typography>
                <TextField
                  fullWidth
                  id="email"
                  value={email}
                  name="email"
                  onChange={(e)=>handleEmailChange(e.target.value)}
                />
                  {formError && <Typography variant='caption' style={{color:"red"}}>Email Should Be Valid</Typography>}
              </Grid>
            </Grid>
              <LoadingButton
            size="small"
            sx={{ mt: 2, color: "white", background: "black" }}
            onClick={handleSendOtp}
            disabled={formError}
            fullWidth
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Send</span>
          </LoadingButton>
          </Box>
        </Box>
      </Container>
    }
   
    <Toaster />
    </>
  )
}

export default PasswordForget