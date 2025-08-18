import React from "react";
// import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const ServiceHero = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("/service1.jpg"), url("/assets/service-hero.jpg")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-6 max-w-3xl text-center">
        <p className="text-sm mb-3">
          Home &gt; <span className="text-gray-300">Our Services</span>
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="text-red-500">Specialties</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
          Comprehensive cardiac care services with state-of-the-art technology
          and experienced specialists. We provide advanced cardiovascular
          treatments with compassionate patient care.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.a
            href="#book"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold shadow-lg"
          >
            Book Consultation
          </motion.a>

          <motion.a
            href="tel:01262279279"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-white/10 border border-white/30 backdrop-blur-md text-white rounded-full flex items-center gap-2 font-semibold shadow-lg"
          >
            <Phone size={18} /> Emergency: 01262-279279
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
