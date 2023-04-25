import React, { useState } from 'react'
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import axios from '../../../utils/axios'
import { USER_LOGIN } from '../../../utils/ConstUrls';
import toast, { Toaster } from 'react-hot-toast';
import Divider from '@mui/material/Divider';
import { setLogin } from '../../../redux/userSlice';
function Login() {



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      return toast.error("Please Fill the Components")
    }
    const body = JSON.stringify({
      email,
      password
    })
    try {

      await axios.post(USER_LOGIN, body, { headers: { "Content-Type": "application/json" } }).then(({ data }) => {
        if (data.success) {

          dispatch(setLogin({
            user: data.userdetails,
            token: data.token
          }));
          localStorage.setItem("token", data.token)
          return navigate("/home");

        } else {

          toast.error(data.message)
        }

      }).catch((err) => {

        toast.error(err.response.data.message)
      })
    } catch (err) {

      toast.error("Oops Something went wrong")
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

                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white", background: "black" }}
          >
            LOGIN
          </Button>
          <Grid container justifyContent="center" alignItems="center">
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
          {/* <Grid container justifyContent="center">
            <Grid > */}
              <Link to={'/signup'} variant="body2">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: "white", background: "#7b7b7b" }}
                >            Sign Up
                </Button>

              </Link>
            {/* </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Toaster position="top-center"
        reverseOrder={false} />
    </Container>
  )
}

export default Login