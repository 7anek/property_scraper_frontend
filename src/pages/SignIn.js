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
import axiosInstance from '../axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function SignIn() {

    const [error, setError] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(true);
    const navigate = useNavigate();

  const removeAlert = () => {
    setErrorAlertVisible((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        username: data.get('username'),
        password: data.get('password'),
    });
    var request_obj = {
        username: data.get('username'),
        password: data.get('password'),
      };
    RequestJWTokens(request_obj);
  };

  function RequestJWTokens(request_obj){
    axiosInstance.post("signin/", {username: request_obj.username, password: request_obj.password})
        .then((response) => {
            console.log("SignIn success");
            console.log("SignIn "+response);
            localStorage.setItem('username', request_obj.username);
            localStorage.setItem('jwt_access_token', response.data.access);
            localStorage.setItem('jwt_refresh_token', response.data.refresh);
            navigate("/");
        })
        .catch(error => {
            console.log("SignIn Error in logging");
            // console.log(error.response.data.detail);
            console.log(error);
            let error_str;
            if( error.hasOwnProperty("response")){
              if(error.response.data.hasOwnProperty("detail")){
                error_str = error.response.data.detail;
              }else{
                error_str=JSON.stringify(error.response.data).replaceAll(/[\[\]{}""]/g,"").replaceAll(",",", ").replaceAll(":",": ");
              }
            }else if(error.hasOwnProperty("message")){
              error_str = error.message;
            }else{
              error_str = "Unknown error";
            }
            console.log(error_str);
            setError(error_str);

        });
  }

  let api_alert;

  if(error !== false){
    // api_alert = <Alert severity="error" onClose={removeAlert}>{error.response.data.detail}</Alert>
    api_alert = <Alert severity="error" >{error}</Alert>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
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
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {errorAlertVisible && api_alert}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}