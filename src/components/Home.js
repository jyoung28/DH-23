import '../App.css';
import axios from "axios";
import React, {useContext, useEffect, useState} from 'react';
import { signInWithPopup} from "firebase/auth";
import runQuery from './SearchFood.js';
import UserContext from './UserContext';
import {db} from '../firebaseSetup/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import BottomNavbar from './bottomNavbar'

function Home() {
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
      setProgress((user_data.data().totalToday/user_data.data().goal).toFixed(2))
    }
  }
  const displayLastItem = () => {
    if (cals != 0) {
      return  <span>Added {cals} calories for "{lastFood}"</span>
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

  return (
    <div className="App">
      <input type='text' onChange={(e) => setFood(e.target.value)}></input>
      <button onClick={()=>handleButton()}>Get Calories</button>

      <button>Search with Picture</button>

      <span> Streak : {streak}</span>
      <h2>Progress: {progress}%</h2>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <h2>Current Calorie Count for Today: {count}</h2>
      {displayLastItem()}
      {displayGoalMet()}
      <BottomNavbar></BottomNavbar>
    </div>
  );
}

export default Home;