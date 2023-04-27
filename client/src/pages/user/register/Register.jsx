import  React,{useState} from 'react';
import CodeIcon from '@mui/icons-material/Code';
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
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import { EMAIL_VERIFICATION_SIGNUP, SIGNUP } from "../../../utils/ConstUrls";
import OtpVerification from '../../../components/user/signup/OtpVerification';




export default  function Register() {



  const [userName,setUserName] = useState("");
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState("")
  const [dateOfBirth,setDateOfBirth]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [gender,setGender]=useState("");
  const [otpComponent,setOtpComponent]=useState(false);
  const [userId,setUserId]=useState("")
  const [loading,setLoading]=useState(false)
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
      // let response=await axios.post(SIGNUP,body,{ headers: { "Content-Type": "application/json" } })
      // if(response.data.success){
      //      navigate('/')
      // }else{
      //  toast.error(response.data.message)
      // }
      setLoading(true)
      axios.post(EMAIL_VERIFICATION_SIGNUP,body,{headers:{"Content-Type":"application/json"}}).then((response)=>{
        setUserId(response.data?.userId)
        setLoading(false)
        toast.success(response.data.message)
        setOtpComponent(true)
      }).catch((Err)=>{
     setLoading(false)
        console.log(Err);
        toast.error(Err.response.data.message)
      })
    }catch(err){
     setLoading(false)
      toast.error("Oops Something went Wrong")
    }
   
  };

  return (
    <>
   {
    otpComponent ?
    <OtpVerification userId={userId}/>
    :

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',     
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <h1>CODERHUB</h1> <CodeIcon/>
          <Typography component="h1" variant="h5">
           SIGNUP
          </Typography>
          <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
           id="gender"
           fullWidth
           label="Gender"
          select
          defaultValue="Male"
          helperText="Please select Gender"
          value={gender}
          onChange={(e)=>setGender(e.target.value)}
        >
            <MenuItem  value="Male">
             Male
            </MenuItem>
            <MenuItem  value="Female">
             Female
            </MenuItem>
            <MenuItem  value="Other">
             Other
            </MenuItem>
        </TextField>
                    
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
            {
              loading ?  <LoadingButton loading fullWidth variant="contained" sx={{ mt: 3, mb: 2,color:"white",background:"black" }}>
              Signup
            </LoadingButton> :

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,color:"white",background:"black" }}
            >
              Sign Up
            </Button>
            }
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={'/'} variant="body2" style={{textDecoration:"none"}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Toaster  position="top-center"
  reverseOrder={false} />
      </Container>
   }
 </>
  );
}        