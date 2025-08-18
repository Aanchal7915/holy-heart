import { useState } from "react";
import { FaBars, FaTimes, FaPhone } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Holy Heart" className="h-10 w-auto" />
          <span className="font-bold text-lg text-red-600">Holy Heart</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          <li><a href="#home" className="hover:text-red-600">Home</a></li>
          <li><a href="#about" className="hover:text-red-600">About Us</a></li>
          <li><a href="#services" className="hover:text-red-600">Services</a></li>
          <li><a href="#doctors" className="hover:text-red-600">Our Doctors</a></li>
          <li><a href="#faqs" className="hover:text-red-600">FAQs</a></li>
          <li><a href="#contact" className="hover:text-red-600">Contact</a></li>
        </ul>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="tel:+9101262279279" className="flex items-center text-red-600 font-semibold">
            <FaPhone className="mr-2" /> +91 01262-279279
          </a>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium">
            Book Appointment
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
            <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setIsOpen(false)}>About Us</a></li>
            <li><a href="#services" onClick={() => setIsOpen(false)}>Services</a></li>
            <li><a href="#doctors" onClick={() => setIsOpen(false)}>Our Doctors</a></li>
            <li><a href="#faqs" onClick={() => setIsOpen(false)}>FAQs</a></li>
            <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
            <li>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full">
                Book Appointment
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
