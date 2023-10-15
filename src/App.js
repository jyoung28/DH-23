import './App.css';
import {HashRouter,  Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import GoalPage from './components/GoalPage';
import LoginPage from './components/loginPage';
import SearchPage from './components/SearchPage';
import ProfilePage from './components/ProfilePage';


function App() {
  return (
    <div className="App">
        <HashRouter basename='/'>
            {/* have the header only be on pages after login */}
            {/* <Header/> */}
            <Routes>
                <Route element={<LoginPage/>} path="/" exact/>
                <Route element={<GoalPage/>} path="/goal" exact/>
                <Route element={<Home/>} path="/home" exact/>
                <Route element={<SearchPage/>} path="/search" exact/>
                <Route element={<ProfilePage/>} path="/profile" exact/>
                {/* <Route element={<TimelinePage/>} path="/timeline" exact/>
                <Route element={<Projects/>} path="/projects" exact/>
                <Route element={<ContactMe/>} path="/contactme" exact/> */}
            </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
