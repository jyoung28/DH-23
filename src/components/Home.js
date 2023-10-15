import '../App.css';
import axios from "axios";
import React, {useContext, useState} from 'react';
import { signInWithPopup} from "firebase/auth";
import runQuery from './SearchFood.js';
import UserContext from './UserContext';


function Home() {
  let {user} = useContext(UserContext);
  const [food, setFood] = useState("");
  const [streak, setStreak] = useState(0);

  return (
    <div className="App">
      <input type='text' onChange={(e) => setFood(e.target.value)}></input>
      <button onClick={()=>runQuery(food, user)}>Get Calories</button>

      <button>Search with Picture</button>

      <span> Streak : {streak}</span>
    </div>
  );
}

export default Home;