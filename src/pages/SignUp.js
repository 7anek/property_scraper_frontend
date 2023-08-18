import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import axiosInstance from '../axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function SignUp() {

  const [error, setError] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const removeAlert = () => {
    setErrorAlertVisible((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var data_obj = {
        first_name: data.get('firstName'),
        last_name: data.get('lastName'),
        username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(data_obj)
    ApiRegister(data_obj)
  };

  function ApiRegister(params){
    axiosInstance.post("accounts/token/signup/",params=params)
      .then((response) => {
        console.log(response);
        setSuccessMessage("Account created. Check your email for confirmation instructions.");

        // axiosInstance.post("accounts/token/signin/",{username: params.username, password: params.password})
        // .then((response) => {
        //     console.log("SignIn success");
        //     console.log("SignIn "+response);
        //     localStorage.setItem('username', params.username);
        //     localStorage.setItem('jwt_access_token', response.data.access);
        //     localStorage.setItem('jwt_refresh_token', response.data.refresh);
        //     navigate("/");
        // })
        // .catch(error => {
        //     console.log("SignIn Error fetching data: ");
        //     let error_str;
        //     if( error.hasOwnProperty("response")){
        //       if(error.response.data.hasOwnProperty("detail")){
        //         error_str = error.response.data.detail;
        //       }else{
        //         error_str=JSON.stringify(error.response.data).replaceAll(/[\[\]{}""]/g,"").replaceAll(",",", ").replaceAll(":",": ");
        //       }
        //     }else if(error.hasOwnProperty("message")){
        //       error_str = error.message;
        //     }else{
        //       error_str = "Unknown error";
        //     }
        //     setError(error_str)
        // });
      })
      .catch(error => {
          console.log("Signup Error fetching data: ");
          setError(error)
      })
  }

  let api_alert;

  if(error !== false){
    api_alert = <Alert severity="error" mt={2} onClose={removeAlert}>{error.response.data.detail}</Alert>
  }

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {errorAlertVisible && api_alert}
            {successMessage && (
              <Alert severity="success" mt={2} onClose={removeAlert}>
                {successMessage}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}