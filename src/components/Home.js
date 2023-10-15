import '../App.css';
import axios from "axios";
import React, {useContext, useEffect, useState} from 'react';
import { signInWithPopup} from "firebase/auth";
import runQuery from './SearchFood.js';
import UserContext from './UserContext';
import {db} from '../firebaseSetup/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import BottomNavbar from './bottomNavbar'
import Post2 from './Post2'
import Post from './Post'
import Post3 from './Post3'
import logo from '../static/logosmall.png'
import { makeStyles } from '@mui/styles';
import { red } from '@mui/material/colors';
import { height } from '@mui/system';
const useStyles = makeStyles((theme) => ({
 logo: {
    
    marginTop:'1rem',
    height: '2rem',
  },
}));
function Home() {
  const classes = useStyles();
  let {user} = useContext(UserContext);
  const [food, setFood] = useState("");
  const [streak, setStreak] = useState(0);
  const [count, setCount] = useState(0);
  const [cals, setCals] = useState(0);
  const [lastFood, setLastFood] = useState("");
  const [goal, setGoal] = useState("");
  const [gain, setGain] = useState(null);
  const [progress, setProgress] = useState(0)

  const handleButton =  async () => {
    try{
      setCals(await runQuery(food, user).then(getCount()));
      setLastFood(food);
    } catch {
      console.error("ERROR IN HANDLE BUTTON")
    }

  }

  const getCount = async () => {
    const user_data = await getDoc(doc(db, "users", user));
    if (user_data.data() && user_data.data().totalToday) {
      setCount(user_data.data().totalToday)
      setGoal(user_data.data().goal)
      setGain(user_data.data().gain)
      setProgress(((user_data.data().totalToday/user_data.data().goal)*100).toFixed(2))
    }
  }

  useEffect(() => {
    getCount();
  }, [cals])

  const displayLastItem = () => {
    if (cals != 0) {
      const curr = cals;
      return  <span>Added {curr.toFixed(2)} calories for "{lastFood}"</span>
    }
  }

  const displayGoalMet = () => {
    if ((count > goal && gain) || (count < goal && !gain)) {
      return <h1>You have met your Goal for today!</h1>
    } else {
      return <h1>You've got this keep trying!</h1>
    }
  }


  useEffect( () => {
    if (user) {
      getCount()
    }
  }, [])

  return (<div><img src={logo} className={classes.logo}></img>
    <div className="App">
         
      <input type='text' onChange={(e) => setFood(e.target.value)}></input>
      <button onClick={()=>handleButton()}>Get Calories</button>

      <button>Search with Picture</button>

      <span> Streak : {streak}</span>
      <h2>Progress: {progress}%</h2>
      <h2>Current Calorie Count for Today: {count.toFixed(2)}</h2>
      {displayLastItem()}
      {displayGoalMet()}
      <div>
      <Post></Post>
      <Post2></Post2>
      <Post3></Post3>
      </div>
      <BottomNavbar></BottomNavbar>
    </div></div>
  );
}

export default Home;