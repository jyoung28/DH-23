import logo from './logo.svg';
import Login from './components/LoginPage.jsx'
import './App.css';
import axios from "axios";
import React, {useState} from 'react';
import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebaseSetup/firebase"
import theme from './theme'; // Import the custom theme
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import Home from './components/Home';
import GoalPage from './components/GoalPage';
import SearchPage from './components/SearchPage';
import CameraPage from './components/CameraPage';
import {HashRouter, Route, Routes} from 'react-router-dom'
import { UserProvider } from './components/UserContext';

import BottomNavbar from './components/bottomNavbar'
function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
        <HashRouter basename='/'>
            <UserProvider>
            {/* have the header only be on pages after login */}
            {/* <Header/> */}
         
            <Routes>
                <Route element={<Login/>} path="/" exact/>
                <Route element={<GoalPage/>} path="/goal" exact/>
                <Route element={<Home/>} path="/home" exact/>
                <Route element={<SearchPage/>} path="/search" exact/>
                {/* <Route element={<TimelinePage/>} path="/timeline" exact/>
                <Route element={<Projects/>} path="/projects" exact/>
                <Route element={<ContactMe/>} path="/contactme" exact/> */}
            </Routes>
            <CameraPage></CameraPage>
            <BottomNavbar></BottomNavbar>
            </UserProvider>
        </HashRouter>
    </div>
             
    </ThemeProvider>
  );
}

export default App;
