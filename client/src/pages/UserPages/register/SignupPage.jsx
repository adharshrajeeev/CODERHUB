import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Link,useNavigate } from 'react-router-dom'
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../../utils/axios'
import { SIGNUP } from "../../../utils/ConstUrls";



export default function SignupPage() {

  const [userName,setUserName] = useState("");
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState("")
  const [dateOfBirth,setDateOfBirth]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [gender,setGender]=useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body=JSON.stringify({
      userName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender
    })

   
    if(userName==="" || email==="" || password==="" || phoneNumber==="" || dateOfBirth==="" || gender===""){
     return toast.error("Please fill the components")
    }
    try{
      let response=await axios.post(SIGNUP,body,{ headers: { "Content-Type": "application/json" } })
      if(response.data.success){
           navigate('/')
      }else{
       toast.error(response.data.message)
      }
    }catch(err){
     
      toast.error("Oops Something went Wrong")
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
                Sign Up
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
                  id="name"
                  label="User Name"
                  name="userName"
                  autoComplete="user name"
                  autoFocus
                  value={userName}
                  onChange={(e)=>setUserName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="number"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                />
                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="dateOfBirth"
                  // label="Date of Birth"
                  type="date"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e)=>setDateOfBirth(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="gender"
                  label="Gender"
                  type="text"
                  id="gender"
                  value={gender}
                  onChange={(e)=>setGender(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                  
                    <Link to={"/"}>
                     <p>Already Have and account? Login</p> 
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