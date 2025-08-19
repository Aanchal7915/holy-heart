import { useState } from "react";
import { FaBars, FaTimes, FaPhone } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();

  return (
    <nav className="fixed w-full z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Holy Heart" className="h-12 md:h-15 w-auto" /> 
          <span className="font-medium text-lg text-red-600 font-pacifico"
          style={{fontFamily:"Pacifico"}}
          >Holy Heart</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 font-medium text-gray-700">
          <li><Link to="/" className="hover:text-red-600">Home</Link></li>
          <li><Link to="/about" className="hover:text-red-600">About Us</Link></li>
          <li><Link to="/services" className="hover:text-red-600">Services</Link></li>
          <li><Link to="/our-doctors" className="hover:text-red-600">Our Doctors</Link></li>
          {/* <li><Link to="/faqs" className="hover:text-red-600">FAQs</Link></li> */}
          <li><Link to="/contact" className="hover:text-red-600">Contact</Link></li>
        </ul>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-6">
          <a href="tel:+9101262279279" className="flex items-center text-red-600 font-semibold">
            <FaPhone className="mr-2" /> +91 01262-279279
          </a>
          <button onClick={()=>navigate("/book-appointment")} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium">
            Book Appointment
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg px-6 mx-auto">
          <ul className="border-t border-gray-400 flex flex-col space-y-4 py-6 text-gray-700 font-medium space-x-2">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
            <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
            <li><Link to="/our-doctors" onClick={() => setIsOpen(false)}>Our Doctors</Link></li>
            {/* <li><Link to="/faqs" onClick={() => setIsOpen(false)}>FAQs</Link></li> */}
            <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li className="border-t border-gray-400 py-6">
              <button onClick={()=>navigate("/book-appointment")} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full">
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
