import logo from './logo.svg';
import LoginPage from './components/loginPage.jsx'
import './App.css';
import axios from "axios";
import React, {useState} from 'react';
import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebaseSetup/firebase"
import theme from './theme'; // Import the custom theme
import { ThemeProvider } from '@mui/material/styles';

function App() {
  const [food, setFood] = useState("");
  const [streak, setStreak] = useState(0);
  const API_KEY = '090ec85dd264d9e6f2affec5165e7e7e';

  const runQuery = () => {
    axios.get('https://trackapi.nutritionix.com/v2/search/instant?query=' + {food} + "limit=1", {
      headers: {
        'x-app-id': 'ab53e741',
        'x-app-key': API_KEY, 
      },
    }).then((response) => {
        // Handle the response data here
        console.log('Response data:', response.data);
    }).catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
    });
  }

  const writeToFB = () => {
    const ref = collection(firestore, "test_data") // Firebase creates this automatically
 
    let data = {
        testData: "sandnakndjkasndjkasknjd"
    }
    
    try {
        addDoc(ref, data)
    } catch(err) {
        console.log(err)
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <input type='text' onChange={(e) => setFood(e.target.value)}></input>
      <button onClick={()=>runQuery()}>Get Calories</button>

      <button>Search with Picture</button>

      <span> Streak : {streak}</span>
      <LoginPage></LoginPage>
    </div>
    </ThemeProvider>
  );
}

export default App;
