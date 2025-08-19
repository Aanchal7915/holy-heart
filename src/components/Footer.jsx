import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import logo from "../assets/logo-holy-heart-removebg.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          
          <div className="">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Holy Heart" className="h-10 md:h-20 w-auto" />
              <span className="font-medium text-xl text-red-500"
              style={{fontFamily:"Pacifico"}}
              >Holy Heart</span>
            </div>
            <p className="text-sm mb-4">
              Holy Heart Advanced Cardiac Care & Research Center has been
              providing exceptional cardiovascular care since 2013, located in
              the heart of Rohtak with state-of-the-art medical technology.
            </p>
            <div className="flex flex-row gap-4 justify-left items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition">
              <a href="https://www.facebook.com/Holyheartrohtak/" target="_blank" rel="noopener noreferrer" className="hover:text-white-500"><FaFacebookF /></a>
            </div>


            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition">
              <a href="https://www.twitter.com/Holyheartrohtak/" target="_blank" rel="noopener noreferrer" className="hover:text-white-500"><FaTwitter /></a>
            </div>


            
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition">
              <a href="https://www.instagram.com/Holyheartrohtak/" target="_blank" rel="noopener noreferrer" className="hover:text-white-500"><FaInstagram /></a>
            </div>



             
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition">
              <a href="https://www.linkedin.com/Holyheartrohtak/" target="_blank" rel="noopener noreferrer" className="hover:text-white-500"><FaLinkedinIn /></a>
            </div>
            </div>

            
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-red-500">Home</a></li>
              <li><a href="#about" className="hover:text-red-500">About Us</a></li>
              <li><a href="#services" className="hover:text-red-500">Services</a></li>
              <li><a href="#doctors" className="hover:text-red-500">Our Doctors</a></li>
              {/* <li><a href="#faqs" className="hover:text-red-500">FAQs</a></li> */}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>24hrs Cardiac Backup</li>
              <li>Angiography & Angioplasty</li>
              <li>Pediatric Cardiology</li>
              <li>Echo & TMT</li>
              <li>Pacemaker Implantation</li>
              <li>Emergency Care</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-red-500 mt-1" />
                <span>
                  330, Vinay Nagar, Delhi Bypass Chowk,<br />
                  Rohtak - 124001, Haryana, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-red-500" />
                <span>01262-279279, 01262-262292</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-red-500" />
                <span>holyheartk@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaClock className="text-red-500" />
                <span>24/7 Emergency Services<br />Mon-Sat: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© 2025 Holy Heart Hospital. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-red-500">Privacy Policy</a>
            <a href="#" className="hover:text-red-500">Terms of Service</a>
            <a href="#" className="hover:text-red-500">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
