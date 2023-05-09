import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import toast,{Toaster} from 'react-hot-toast'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdminLogin } from '../../../redux/adminSlice';
import { adminLogin } from '../../../api/AdminServices';

const theme = createTheme();

function Login() {

        const [adminId,setAdminId]=useState("")
        const [adminPassword,setAdminPassword]=useState("");
        const navigate=useNavigate();
        const dispatch=useDispatch();

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(adminId==="" || adminPassword===""){
            return toast.error("Please fill the components.")
        }
        const body={
            adminId,
            adminPassword
        }

        try{

            const {adminToken}=await adminLogin(body)
            dispatch(setAdminLogin(adminToken));
            localStorage.setItem('adminToken',adminToken)
            navigate('/admin/dashboard'); 

        }catch(err){
        
           toast.error(err.response.data.message)
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
                        ADMIN LOGIN
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="adminId"
                            value={adminId}
                            onChange={(e)=>setAdminId(e.target.value)}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="adminPassword"
                            label="Password"
                            type="password"
                            value={adminPassword}
                            onChange={(e)=>setAdminPassword(e.target.value)}
                            id="password"
                            autoComplete="current-password"
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
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </ThemeProvider>
    );
}

export default Login