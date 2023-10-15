import './App.css';
import {HashRouter,  Route, Routes} from 'react-router-dom'
import Home from './components/Home';


function App() {
  return (
    <div className="App">
        <HashRouter basename='/'>
            {/* have the header only be on pages after login */}
            {/* <Header/> */}
            <Routes>
                <Route element={<Home/>} path="/" exact/>
                {/* <Route element={<TimelinePage/>} path="/timeline" exact/>
                <Route element={<Projects/>} path="/projects" exact/>
                <Route element={<ContactMe/>} path="/contactme" exact/> */}
            </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
