import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import OurDoctor from './pages/OurDoctor'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<Contact/>}/>
        <Route path="/service" element={<Service />} />
        <Route path="/our-doctor" element={<OurDoctor/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;