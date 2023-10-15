import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button

} from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center content both horizontally and vertically
    minHeight: '100vh', // Ensure the container takes up the full viewport height
  },
  form: {
    width: '100%',
    marginTop: '5rem'
  },
  button: {
    marginTop: '2rem',
  },
}));

function GoalPage({ user }) {
  const classes = useStyles();
  const [calorieGoal, setCalorieGoal] = useState('');
  const [gainOrLose, setGainOrLose] = useState(false);

  const handleCalorieGoalChange = (event) => {
    setCalorieGoal(event.target.value);
  };

  const handleGainOrLoseChange = () => {
    setGainOrLose((prev) => !prev);
  };

  const handleSubmit = () => {
    // Handle the submission of the calorie goal and gainOrLose values
    console.log('User:', user);
    console.log('Calorie Goal:', calorieGoal);
    console.log('Gain or Lose:', gainOrLose);
  };

  return (
    <div>
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
          control={<Switch checked={gainOrLose} onChange={handleGainOrLoseChange} />}
          label={gainOrLose ? 'Gain' : 'Lose'}
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
    </div>
  );
}

export default GoalPage;
