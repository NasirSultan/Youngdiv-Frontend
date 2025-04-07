import { Routes, Route,useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./Navbar"; 


function App() {
  const location = useLocation();
const data = location.state?.data;
  return (
  <>
    <Navbar/>
    <Routes>
 
    <Route path="/" element={<h1>Home</h1>} />

      <Route path="/about" element={<h1>about {data}</h1>} />
    </Routes>

  
  </>
    );
}

export default App;