import React, { useEffect, useState } from 'react'
import CodeIcon from '@mui/icons-material/Code';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux'
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Divider from '@mui/material/Divider';
import { setLogin } from '../../../redux/userSlice';
import { userLogin } from '../../../api/UserServices';
import { isValidatePassword, validateEmail } from '../../../components/user/utils/Validation';
function Login() {


  const location=useLocation();
  const resetMessage=location.state?.message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [loginError,setLoginError]=useState({emailErr:null,passwordError:null});
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(resetMessage) {
     toast(resetMessage,
  {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
      window.history.replaceState(null,"")
    }
  },[resetMessage])


  const onHandleEmailChange = (event)=>{
    if(!validateEmail(event.target.value)){
      setLoginError({emailErr:"Enter Valid EmailId"})
    }else{
      setLoginError({emailErr:null})
    }
    setEmail(event.target.value)
  }


  const onHandlePasswordChange = (event) =>{
    if(!isValidatePassword(event.target.value)){
      setLoginError({passwordError:"Enter Valid Password(Min 8 characters)"})
    }else{
      setLoginError({passwordError:null})
    }
    setPassword(event.target.value)
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      return toast.error("Please Fill the Components")
    }
    const body = {
      email,
      password
    }
        try{
          setLoading(true)
          const response=await userLogin(body);
          dispatch(setLogin({
            user: response.data.userdetails,
            token: response.data.token
          }));
          localStorage.setItem("token", response.data.token)
           navigate("/home");
        }catch(err){
          setLoading(false)
          toast.error(err?.response?.data?.message)
        }

  };
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(loginError.emailErr)}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onHandleEmailChange}
              />
              {loginError.emailErr && <span style={{color: 'red',fontSize:"small"}}>{loginError.emailErr}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField

                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password" 
                value={password}
                onChange={onHandlePasswordChange}
                />
                { loginError.passwordError && <span style={{color: 'red',fontSize:"small"}}>{loginError.passwordError}</span>}
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            disabled={Boolean(loginError.emailErr) || !Boolean(email) || !Boolean(password) || Boolean(loginError.passwordError)}
            variant="contained"
            
            sx={{ mt: 3, mb: 2, color: "white", background: "black" }}
          >
            LOGIN
          </LoadingButton>
          <Box display={"flex"} justifyContent="center" alignItems="center" sx={{cursor:"pointer",textDecoration:"none"}} >
          <Link to={'/forgetPassword'} style={{textDecoration:"none"}}>
           <Typography>
           Forgot Password ?

           </Typography>
          </Link>
          </Box>
          <Grid mt={1} container justifyContent="center" alignItems="center">
            <Grid item xs={4} sm={4}>
              <Divider />
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography align="center">OR</Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Divider />
            </Grid>
          </Grid>
              <Link to={'/signup'} variant="body2">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: "white", background: "#7b7b7b" }}>
                    Sign Up
                </Button>

              </Link>
        </Box>
      </Box>
      <Toaster position="top-center"
        reverseOrder={false} />
    </Container>
  )
}

export default Login