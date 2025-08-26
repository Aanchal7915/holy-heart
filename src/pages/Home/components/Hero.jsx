
import heroBg from "../../../assets/hero-bg.jpg";
import { FaPhone, FaHeartbeat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();
  const handleReadMore = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/about");
    }
  };
  return (
    <section
      id="home"
      className="h-screen flex items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container relative mx-auto px-6 md:px-12 z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Advanced <span className="text-red-400">Cardiac Care</span><br /> You Can Trust
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Holy Heart Hospital provides comprehensive cardiovascular care with
            state-of-the-art technology, experienced specialists, and 24/7 emergency services. 
            Your heart health is our priority.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold flex items-center"
              onClick={() => navigate("/book-appointment")}
            >
              <FaHeartbeat className="mr-2" /> Book Appointment
            </button>
            <button
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-6 py-3 rounded-full font-semibold flex items-center"
              onClick={() => navigate("/services")}
            >
              Our Services
            </button>
          </div>

          <div className="mt-8 flex items-center space-x-3">
            <a href="tel:01262279279" className="flex items-center">
              <FaPhone className="text-red-500 text-2xl" />
            </a>
            <div>
              <p className="text-sm text-gray-300">24/7 Emergency Helpline</p>
              <a href="tel:01262279279" className="text-lg font-bold text-white hover:underline">01262-279279</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
