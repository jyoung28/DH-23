import logo from './logo.svg';
import LoginPage from './components/loginPage.jsx'
import './App.css';
import axios from "axios";
import React, {useState} from 'react';
import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebaseSetup/firebase"
import theme from './theme'; // Import the custom theme
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import {HashRouter,  Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import GoalPage from './components/GoalPage';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
        <HashRouter basename='/'>
            {/* have the header only be on pages after login */}
            {/* <Header/> */}
            <Routes>
                <Route element={<Home/>} path="/" exact/>
                <Route element={<GoalPage/>} path="/" exact/>
                {/* <Route element={<TimelinePage/>} path="/timeline" exact/>
                <Route element={<Projects/>} path="/projects" exact/>
                <Route element={<ContactMe/>} path="/contactme" exact/> */}
            </Routes>
        </HashRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
