import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate,Link } from "react-router-dom";
import axios from '../../../utils/axios'
import { LOGIN } from "../../../utils/ConstUrls";
import {useDispatch} from 'react-redux'
import {setLogin} from '../../../redux/store'
export default  function  LoginPage() {


  const [email,setEmail]=useState('');
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleSubmit =async (event) => {
    event.preventDefault();
    
    if(email==="" || password === ""){
        return toast.error("Please Fill the Components")
    }
    const body= JSON.stringify({
      email,
      password
    })
    try{
      
    await axios.post(LOGIN,body,{ headers: { "Content-Type": "application/json" } }).then(({data})=>{
      document.cookie=`token:${data.token}`
      dispatch(setLogin({
        user:data.userdetails,
        token:data.token
      }));
      navigate('/home')
    
    }).catch((err)=>{
      console.log(err)
    })
      // if(response.data.success){
      //   console.log(response.data)
      //  document.cookie=`"token:${response.data.token}`
      //   navigate("/home")
      // }else{
      //     toast.error(response.data.message)
      // }
    }catch(err){
        toast.error("Oops Something went wrong")
    }
  };

  return (
  
  
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://w0.peakpx.com/wallpaper/688/193/HD-wallpaper-ghibli-a%C2%B7-github-topics-a%C2%B7-github-cute-ghibli.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                   <Link to={'/signup'}>
                   <p>Dont Have and Account? Signup</p>
                   </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Toaster  position="top-right"
  reverseOrder={false} />
    </Container>
  );
}