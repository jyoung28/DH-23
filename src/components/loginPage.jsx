import React, { useState } from 'react';
import { Button, Container, CssBaseline, TextField, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Logo from '../static/logo.png'
import theme from '../theme'; // Import the custom theme

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: '1rem',
  },
  submit: {
 
  },  logo: {
    width: '25rem', // Adjust the width and height according to your logo's dimensions
    height: 'auto',
  }
}));

function LoginPage() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        <img src={Logo} alt="Logo" className={classes.logo} />
        </Typography>
        <form className={classes.form} noValidate>

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;