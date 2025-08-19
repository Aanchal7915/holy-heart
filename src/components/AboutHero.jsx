import React from "react";
import { Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url("/assets/about-hero.jpg")` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-12 text-white">
        {/* Breadcrumb */}
        <p className="text-sm mb-4">
          Home <span className="mx-2">›</span> About Us
        </p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          About <span className="text-red-400">Holy Heart</span> Hospital
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl leading-relaxed text-gray-200"
        >
          Pioneering advanced cardiac care since <span className="font-bold">2013</span>, 
          we are committed to excellence in cardiovascular treatment with 
          cutting-edge technology and compassionate patient care.
        </motion.p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
          >
            <Heart size={20} /> Our Services
          </motion.a>

          <motion.a
            href="#visit"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            <MapPin size={20} /> Visit Us
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default About;
