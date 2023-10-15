import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button

} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {db} from '../firebaseSetup/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import UserContext from './UserContext';
import BottomNavbar from './bottomNavbar'
import logo from '../static/logosmall.png'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center content both horizontally and vertically
    minHeight: '90vh', // Ensure the container takes up the full viewport height
  },
  form: {

    width: '400px',
    marginTop: '5rem'
  },
  button: {
    marginTop: '2rem',
  },  logo: {
    
    marginTop:'1rem',
    height: '2rem',
  },
}));

function GoalPage() {
  let {user} = useContext(UserContext);
  const classes = useStyles();
  const [calorieGoal, setCalorieGoal] = useState('');
  const [gain, setGain] = useState(false);

   const handleCalorieGoalChange = (event) => {
    setCalorieGoal(event.target.value);
  };

  useEffect(()=>{
    console.log(user)
  }, [])

  const handleGainOrLoseChange = () => {
    setGain((prev) => !prev);
    // also a db.write
  };

  const handleSubmit = async () => {
    // Handle the submission of the calorie goal and gainOrLose values
    console.log('User:', user);
    console.log('Calorie Goal:', calorieGoal);
    console.log('Gain or Lose:', gain);
    const user_data = await getDoc(doc(db, "users", user));
    let total = 0;
    if (user_data.data() && user_data.data().totalToday) {
      total = user_data.data().totalToday;
    }
    await setDoc(doc(db, "users", user), {
      goal:calorieGoal,
      gain: gain,
      totalToday : total,
    });
  };

  return (
    <div>
        <img src={logo} className={classes.logo}></img>
    <Container className={classes.container}>
   
      <Typography variant="h5" gutterBottom>
        {user}'s Goal Page
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          label="Calorie Goal"
          variant="outlined"
          fullWidth
          type="number"
          value={calorieGoal}
          onChange={handleCalorieGoalChange}
          margin="normal"
        />
        <FormControlLabel
          control={<Switch checked={gain} onChange={handleGainOrLoseChange} />}
          label={gain ? 'Gain' : 'Lose'}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          onClick={handleSubmit}
        >
          Set Goal
        </Button>
      </form>
    </Container>
    <BottomNavbar></BottomNavbar>
    </div>
  );
}

export default GoalPage;
