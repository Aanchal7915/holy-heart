import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import OurDoctor from './pages/OurDoctor'
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="sm:min-w-0 min-w-[500px] sm:overflow-x-visible overflow-x-auto bg-gray-100">
      <Navbar />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/services" element={<Service />} />
        <Route path="/our-doctors" element={<OurDoctor/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;