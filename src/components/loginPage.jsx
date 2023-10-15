import React, { useState } from 'react';
import { Button, Container, CssBaseline, TextField, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Logo from '../static/logo.png'
import theme from '../theme'; // Import the custom theme
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebaseSetup/firebase';
import { signInWithPopup} from "firebase/auth";

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

  const navigate = useNavigate();
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);


  const handleLogin = () => {
      signInWithPopup(auth, provider).then((result) => {
      if (result?.user.email !== null) {
        setUser(result.user.email);
        setSignedIn(true);
        navigate('/home')
      } else {
        console.error("error with signing in");
      }
    });
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