import  React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link,useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../../utils/axios'
import { SIGNUP } from "../../../utils/ConstUrls";




export default  function Register() {



  const [userName,setUserName] = useState("");
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState("")
  const [dateOfBirth,setDateOfBirth]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [gender,setGender]=useState("");
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
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
      
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                   autoComplete="given-name"
                   name="userName"
                   fullWidth
                   id="firstName"
                   label="User Name"
                   autoFocus
                   value={userName}
                  onChange={(e)=>setUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
            
                 fullWidth
                 id="email"
                 label="Email Address"
                 name="email"
                 autoComplete="email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="dateOfBirth"
      
                  type='date'
                  fullWidth
                  id="DateOfBirth"
                  value={dateOfBirth}
                  onChange={(e)=>setDateOfBirth(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  autoComplete="gender"
                  value={gender}
                  onChange={(e)=>setGender(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                
                  fullWidth
                  type='number'
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="number"
                  value={phoneNumber}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                />
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
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,color:"white",background:"black" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={'/'} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Toaster  position="top-right"
  reverseOrder={false} />
      </Container>
 
  );
}