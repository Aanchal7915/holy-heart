import { useState } from "react";
import { FaBars, FaTimes, FaPhone, FaCalendarPlus } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Listen for window resize to update width
  // Only runs on client
  if (typeof window !== "undefined") {
    window.onresize = () => {
      if (window.innerWidth !== windowWidth) {
        setWindowWidth(window.innerWidth);
      }
    };
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Holy Heart" className="h-10 w-auto" />
          <span className="font-medium text-base text-red-600 font-pacifico"
            style={{ fontFamily: "Pacifico" }}
          >Holy Heart</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-5 font-medium text-gray-700 text-[0.97rem]">
          <li><Link to="/" className="hover:text-red-600 px-1">Home</Link></li>
          <li><Link to="/about" className="hover:text-red-600 px-1">About Us</Link></li>
          <li><Link to="/services" className="hover:text-red-600 px-1">Services</Link></li>
          <li><Link to="/test" className="hover:text-red-600 px-1">Test</Link></li>
          <li><Link to="/our-doctors" className="hover:text-red-600 px-1">Our Doctors</Link></li>
          <li><Link to="/contact" className="hover:text-red-600 px-1">Contact</Link></li>
          <li><Link to="/opds" className="hover:text-red-600 px-1">OPDs</Link></li>
          {!token && <>
            <li><Link to="/login" className="hover:text-red-600 px-1">Login</Link></li>
            <li><Link to="/register" className="hover:text-red-600 px-1">Register</Link></li>
          </>}
          {token && role === "admin" && <li><Link to="/admin-dashboard" className="hover:text-red-600 px-1">Dashboard</Link></li>}
          {token && role !== "admin" && <li><Link to="/user-dashboard" className="hover:text-red-600 px-1">Dashboard</Link></li>}
          {token && <li><button onClick={handleLogout} className="hover:text-red-600 px-1">Logout</button></li>}
        </ul>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {windowWidth > 1200 ? (
            <>
              <a href="tel:+9101262279279" className="flex items-center text-red-600 font-semibold text-[0.97rem]">
                <FaPhone className="mr-2" /> +91 01262-279279
              </a>
              <button onClick={() => navigate("/book-appointment")} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full font-medium text-[0.97rem]">
                Book Appointment
              </button>
            </>
          ) : (
            <>
              <a href="tel:+9101262279279" className="flex items-center text-red-600 font-semibold">
                <FaPhone className="text-xl" />
              </a>
              <button onClick={() => navigate("/book-appointment")} className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-full font-medium flex items-center">
                <FaCalendarPlus className="text-xl" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg px-4 mx-auto">
          <ul className="border-t border-gray-400 flex flex-col space-y-3 py-5 text-gray-700 font-medium text-[1rem]">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
            <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
            <li><Link to="/test" onClick={() => setIsOpen(false)}>Test</Link></li>
            <li><Link to="/our-doctors" onClick={() => setIsOpen(false)}>Our Doctors</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li><Link to="/opds" onClick={() => setIsOpen(false)}>OPDs</Link></li>
            {!token && <>
              <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
              <li><Link to="/register" onClick={() => setIsOpen(false)}>Register</Link></li>
            </>}
            {token && role === "admin" && <li><Link to="/admin-dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>}
            {token && role !== "admin" && <li><Link to="/user-dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>}
            {token && <li><button onClick={() => { setIsOpen(false); handleLogout(); }} className="hover:text-red-600">Logout</button></li>}
            <li className="border-t border-gray-400 py-4">
              <button onClick={() => navigate("/book-appointment")} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full text-[0.97rem]">
                Book Appointment
              </button>
            </li>
            <li>
              <a href="tel:+9101262279279" className="flex items-center text-red-600 font-semibold">
                <FaPhone className="mr-2" /> +91 01262-279279
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
