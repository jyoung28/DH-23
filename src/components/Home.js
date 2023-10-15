import '../App.css';
import axios from "axios";
import React, {useState} from 'react';
import { signInWithPopup} from "firebase/auth";
import runQuery from './SearchFood.js';


function Home() {
  const [food, setFood] = useState("");
  const [streak, setStreak] = useState(0);

  return (
    <div className="App">
      <input type='text' onChange={(e) => setFood(e.target.value)}></input>
      <button onClick={()=>runQuery(food)}>Get Calories</button>

      <button>Search with Picture</button>

      <span> Streak : {streak}</span>
    </div>
  );
}

export default Home;