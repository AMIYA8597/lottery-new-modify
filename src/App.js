import logo from './logo.svg';
import './App.css';
import Home from "./Home.js"
import UserAdd from "./UserAddition.js"
import WinnerAdd from "./WinnerAddition.js";
import ComponentIncrease from "./AddCounts.js"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li className='li'>
              <Link to="/">Home</Link>
            </li>
            {/* <li className='li'>
              <Link to="/user">User </Link>
            </li> */}
            
            {/* <li className='li'>
              <Link to="/winner"> Winner </Link>
            </li> */}
            <li className='li'>
              <Link to="/component">ComponentIncrease</Link>
            </li>
          </ul>
        </nav>

        <Routes className = "routes">
          <Route path="/" element={<Home />}></Route>
          <Route path="/user" element={<UserAdd />}></Route>
          <Route path="/winner" element={<WinnerAdd />}></Route>
          <Route path="/component" element={<ComponentIncrease />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;




