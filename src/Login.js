import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

// Material UI
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

const defaultTheme = createTheme();

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/x-www-form-urlencoded',
    // Other headers you want to include
  };
  
function Login() {
    const [email, setEmail] = useState('')

    useEffect(() => {
        // Call the onlineCheck function when the component is rendered
        onlineCheck();
      }, []); // Empty dependency array ensures it runs only once
    

    const onlineCheck = async (e) => {
        try {
            const response = await axios.post('http://localhost:5001/api/users/onlinecheck', qs.stringify({
            }),{
                headers: headers,
                withCredentials: true
            });
            console.log(response)
            setEmail(response.data.user.username)
            // Handle successful login (redirect or show a message)
          } catch (error) {
            console.error('Login failed:', error.response);
          }
    }

    const handleLogin = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
  
      // Get data from form
      const data = new FormData(e.currentTarget);

      const username =  data.get('username')
      const password =  data.get('password')

      try {
        const response = await axios.post('http://localhost:5001/api/users/login/password', qs.stringify({
          username,
          password,
        }),{
            headers: headers,
            withCredentials: true
        });
        console.log(response)
        window.location.reload(true)
      } catch (error) {
        console.error('Login failed:', error.response);
      }
    };

    const handleLogout = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.post('http://localhost:5001/api/users/logout', qs.stringify({
                // your data
              }), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true,
              });
          console.log(response)
          window.location.reload(true)
          // Handle successful logout (redirect or show a message)
        } catch (error) {
          console.error('Logout failed:', error.response);
        }
      };

     function LoginForm() {
      return(
      <ThemeProvider theme={defaultTheme}>
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
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autofocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autofocus
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
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )
    }

    if (email){
        return (
            <div>
              <p>{email}</p>
              <form onSubmit={handleLogout}>
                <div>
                  <button type="submit">Logout</button>
                </div>
              </form>
            </div>
          );
    }else{
        return (
            <div>
               <LoginForm/>
            </div>
          );
    }
  }
  
  export default Login;
  