import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { useState } from 'react'; // Import useState
import Home from "./Pages/Home";
import Login from "./Pages/Login";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return ( <Router>
    <nav className="nav">
    <Link to="/login"> Login </Link>
    </nav>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
    </Routes>
    </Router>
  );
}


export default App;
