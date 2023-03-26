import  React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../../utils/axios'
import { ADMINLOGIN } from '../../../utils/ConstUrls';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function AdminLogin() {


  const [adminId,setAdminId]=useState("");
  const [adminPassword,setAdminPassword]=useState("")
  const navigate=useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(adminId==="" || adminPassword === ""){
      return toast.error("Please Fill the Components")
  }
  const body= JSON.stringify({
    adminId,
    adminPassword
  }) 

  try{
    axios.post(ADMINLOGIN,body,{ headers: { "Content-Type": "application/json" } }).then(({data})=>{
      if(data.success){
        localStorage.setItem("adminToken",data.adminToken);
        navigate('/admin/dashboard')
      }else{
        toast.error(data.message)
      }
    })
  }catch(err){
    toast.error("oops something went wrong")
  }
    
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={adminId}
              autoComplete="email"
              autoFocus
              onChange={(e)=>setAdminId(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={adminPassword}
              onChange={(e)=>setAdminPassword(e.target.value)}
              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <Toaster  position="top-right"
  reverseOrder={false} />
    </ThemeProvider>
  );
}