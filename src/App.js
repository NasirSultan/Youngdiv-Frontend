import { Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./about";
import Dish from "./dishes";
import Update from "./update";
function App() {
  return (
    <Routes>
  <Route path="/" element={<About/>} />
  <Route path="/dish" element={<Dish/>} />
  <Route path="/update" element={<Update/>} />
      <Route path="/about" element={<h1>about</h1>} />
    </Routes>
  );
}

export default App; 
