import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
    <Home/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/service" element={<Service/>}/>
      </Routes>
    </div>
  );
}

export default App;