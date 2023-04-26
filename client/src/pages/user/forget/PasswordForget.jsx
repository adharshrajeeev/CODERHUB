import React, { useState } from 'react'
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../../utils/axios'
import OtpSubmit from '../../../components/user/forgotPassword/OtpSubmit';
import { SEND_OTP_REQUEST } from '../../../utils/ConstUrls';


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


    const handleSendOtp = ()=>{
        setLoading(true);
        const body=JSON.stringify({
            email
        })
        try{
            axios.post(SEND_OTP_REQUEST,body,{headers:{"Content-Type":'application/json'}}).then((res)=>{
              setUserId(res.data.userId)
              setLoading(false);
              setOtpComponent(true);
              toast.success(res.data.message)
            }).catch((err)=>{
                console.log(err,"errrorrr")

                setLoading(false);
                toast.error(err.response.data.message)
            })
        }catch(err){
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