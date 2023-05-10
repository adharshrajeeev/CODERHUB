import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/joy/FormLabel';
import { Button } from '@mui/material';
import toast from 'react-hot-toast'
import Box from '@mui/material/Box';
import decodeToken from '../../../utils/Services';
import { sendOtpandResetPassword } from '../../../api/UserServices';






function SubmitOtp({setComponent}) {

  const [OTP, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [minNewPassError, setMinNewPassError] = useState(false);
  const [otpError,setOtpError]=useState(false);



  const handleOtpChange = (data) => {
    if(data?.trim()==="" || data?.trim().length !==5){
      setOtpError(true)
    }else{
      setOtpError(false)
    }
    setOTP(data)
   
  }

  const handlePasswordChange = (data) => {
    if (data?.trim() === "" || data?.trim().length < 5) {
      setMinNewPassError(true)
    } else {
      setMinNewPassError(false)
    }
    setNewPassword(data)
  }


  const handleResetSubmit = async()=>{
    try{
  
      const userId=decodeToken();
      const body={
        userId,
        newPassword,
        OTP
      }
      const response = await sendOtpandResetPassword(body)
      
      setComponent(false)
      toast(response?.data.message,
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    }catch(err){
      setNewPassword("");
      setOTP("")
      toast.error(err.response.data.message)
    
    }
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <Box
        sx={{
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <FormControl variant="outlined">
          <FormLabel>Type Your OTP Here</FormLabel>
          <TextField id="outlined-basic"
           variant="outlined" 
           value={OTP} 
           type="number"
           size='small' sx={{width:'32ch'}}
           inputProps={{ maxLength: 5 }}
            onChange={(e) => handleOtpChange(e.target.value)} 
            />
        {otpError && <span style={{color:"red"}}>Minimum five character Required</span>}
        </FormControl>
        <FormControl variant="outlined">
          <FormLabel>Type your New password</FormLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={newPassword}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
            size='small'
          />
          {minNewPassError && <span style={{color:"red"}}>Minimum five character Required</span>}

        </FormControl>

        {
          (OTP?.trim().length === 5 && newPassword?.length > 4) && <Button sx={{width:'33ch'}} onClick={handleResetSubmit} variant="contained">Submit</Button>
        }


      </Box>

    </div>
  )
}

export default SubmitOtp