import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
    <Home/>
    <Routes>
      <Route Component={<Home/>}/>
      <Route Component={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;