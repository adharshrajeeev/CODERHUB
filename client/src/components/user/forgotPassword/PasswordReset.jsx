import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { ThemeProvider, styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { fetchUserDetails, sendOtpRequest } from '../../../api/UserServices';
import decodeToken from '../../../utils/Services';
import toast, { Toaster } from 'react-hot-toast'
import SubmitOtp from './SubmitOtp';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));




function PasswordReset() {

  useEffect(() => {
    fetchUserDetails();
  }, [])
  const userEmail = useSelector((state) => state?.user?.user?.email)

  const [loading, setLoading] = React.useState(false);
  const [showComponent, setComponent] = React.useState(false)

  const handleSendOtp = async () => {
    setLoading(true);
    const userId = decodeToken()
    const body = {
      userId,
      userEmail
    }
    try {

      const response = await sendOtpRequest(body)
      setComponent(true)
      setLoading(false);
      toast.success(response.data.message)

    } catch (err) {
      setLoading(false);
      console.log(err.response.data.message)
      console.log(err, "error in reset catch")
      toast.error(err.response.data.message)
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <ThemeProvider >
            <Box >
              <Item >
               {showComponent ? "Submit Otp" : "Reset Password"} 
              </Item>
            </Box>
          </ThemeProvider>
        </Grid>
      </Grid>
      {
        showComponent ? (
          <SubmitOtp setComponent={setComponent}/>  
        ) :
          (
            <div style={{ marginTop: "50px" }}>
            <Stack
              component="form"
              sx={{
                width: '25ch',
                margin: '0 auto', // centers the Stack horizontally
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // centers the Stack vertically
              }}
              spacing={2}
              noValidate
              autoComplete="off"
            >
              <h3>Forgot password?</h3>
              <h6>Reset password in two quick step</h6>
              <TextField
                hiddenLabel
                disabled
                id="filled-hidden-label-small"
                value={userEmail}
                variant="filled"
                size="small"
              />
              <LoadingButton
                onClick={handleSendOtp}
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                <span>Send</span>
              </LoadingButton>


            </Stack>
          </div>
          )
        }
        <Toaster />
    </>
  )
}

export default PasswordReset