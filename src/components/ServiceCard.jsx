import React from "react";
import { CheckCircle, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const ServiceCard = () => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
         {/* Right Image */}
        <div>
          <img
            src="/service2.jpg"
            onError={(e) =>
              (e.target.src =
                "https://source.unsplash.com/600x400/?cardiology,hospital")
            }
            alt="Valvular Heart Disease"
            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
        {/* Left Content */}
        <div>
          {/* Icon + Title */}
          <div className="flex items-center gap-2 mb-4">
            <Heart className="text-red-500" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold">
              Valvular Heart Disease
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Comprehensive treatment for heart valve problems. Our expert team
            provides both medical management and surgical interventions for
            damaged or defective heart valves.
          </p>

          {/* Features */}
          <ul className="space-y-3 text-gray-700 mb-8">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              Treatment for all four heart valves
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              Advanced valve repair and replacement
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              Minimally invasive surgical options
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              Long-term cardiac monitoring and care
            </li>
          </ul>

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.a
              href="#book"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold shadow-lg"
            >
              Book Consultation
            </motion.a>
            <motion.a
              href="#questions"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-pink-100 hover:bg-pink-200 text-red-600 rounded-full font-semibold flex items-center gap-2 shadow-md"
            >
              <MessageCircle size={18} /> Ask Questions
            </motion.a>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default ServiceCard;
