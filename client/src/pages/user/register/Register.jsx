import  React,{useState} from 'react';
import CodeIcon from '@mui/icons-material/Code';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import OtpVerification from '../../../components/user/signup/OtpVerification';
import { userRegister } from '../../../api/UserServices';
import { isValidatePassword, isValidatePhoneNumber, validateEmail } from '../../../components/user/utils/Validation';




export default  function Register() {



  const [userName,setUserName] = useState("");
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState("")
  const [dateOfBirth,setDateOfBirth]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [gender,setGender]=useState("");
  const [signupError,setSignUpError] = useState({useNameErr:null,emailErr:null,passwordErr:null,phoneNumberErr:null,dateOfBirthErr:null})
  const [otpComponent,setOtpComponent]=useState(false);
  const [userId,setUserId]=useState("")
  const [loading,setLoading]=useState(false)


  const today = new Date();
  const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minDateString = minDate.toISOString().split("T")[0];


  

  const handleEmailChange = (event)=>{
    if(!validateEmail(event.target.value)){
      setSignUpError({emailErr:"Enter Valid Email"})
    }else{
      setSignUpError({emailErr:null})
    }
    setEmail(event.target.value)
  }


  const handlePhoneNumberChange = (event)=>{
    if(!isValidatePhoneNumber(event.target.value)){
      setSignUpError({phoneNumberErr:"Enter valid Number"})
    }else{
      setSignUpError({phoneNumberErr:false})
    }
    setPhoneNumber(event.target.value)
  }

  const handlePasswordChange = (event)=>{
    if(!isValidatePassword(event.target.value)){
      setSignUpError({passwordErr:"Enter Valid Password(Min 8 Letters)"})
    }else{
      setSignUpError({passwordErr:null})
    }
    setPassword(event.target.value)
  }


  const handleDateChange = (event)=>{
    const selectedDate=event.target.value
    if(selectedDate >= minDateString){
      setSignUpError({dateOfBirthErr:"You must be 18 years old or above"})
    }else{
      setSignUpError({dateOfBirthErr:null})
      
    }
    setDateOfBirth(selectedDate)
  }



  const handleSubmit = async(event) => {
    event.preventDefault();
    const body={
      userName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender
    }

   
    if(userName==="" || email==="" || password==="" || phoneNumber==="" || dateOfBirth==="" || gender===""){
     return toast.error("Please fill the components")
    }
    try{

      setLoading(true)
      const response=await userRegister(body)
      setOtpComponent(true)
      setUserId(response.data?.userId)
      setLoading(false)
      toast.success(response.data.message)

    }catch(err){
     setLoading(false)
     setOtpComponent(false)
      toast.error(err.response.data.message)
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
                error={Boolean(signupError.emailErr)}
                 fullWidth
                 id="email"
                 label="Email Address"
                 name="email"
                 autoComplete="email"
                 value={email}
                 onChange={handleEmailChange}
                />
                {signupError.emailErr && <span style={{color: 'red',fontSize:"small"}}>{signupError.emailErr}</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
               name="dateOfBirth"
                helperText={!Boolean(signupError.dateOfBirthErr) && "Please select Gender"}
               type="date"
               fullWidth
               id="DateOfBirth"
              value={dateOfBirth}
                onChange={handleDateChange}
                 autoFocus
                 />
                 {signupError.dateOfBirthErr && <span style={{color: 'red',fontSize:"small"}}>{signupError.dateOfBirthErr}</span>}
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
                    error={Boolean(signupError.phoneNumberErr)}
                    fullWidth
                    type='number'
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    />
                {signupError.phoneNumberErr && <span style={{color: 'red',fontSize:"small"}}>{signupError.phoneNumberErr}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                    error={Boolean(signupError.passwordErr)}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {signupError.passwordErr && <span style={{color: 'red',fontSize:"small"}}>{signupError.passwordErr}</span>}
              </Grid>
            </Grid>
            
             <LoadingButton loading={loading} 
              type="submit"
             fullWidth variant="contained" 
             sx={{ mt: 3, mb: 2,color:"white",background:"black" }}
             disabled={signupError.passwordErr || signupError.emailErr || signupError.phoneNumberErr || signupError.dateOfBirthErr ||
               !Boolean(email) || !Boolean(userName) || !Boolean(phoneNumber) || !Boolean(password) || !Boolean(gender)}
             >
              Signup
            </LoadingButton> 
            
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