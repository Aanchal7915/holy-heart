import React from "react";
import { CheckCircle, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

// Map string -> Lucide icon
const icons = {
  Heart: Heart,
};

const ServiceCard = ({ title, description, image, reactIconName, listText }) => {
  const Icon = icons[reactIconName] || Heart;

  return (
    <section className="w-full bg-white py-16 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Right Image */}
        <div>
          <img
            src={image}
            onError={(e) =>
            (e.target.src =
              "https://source.unsplash.com/600x400/?cardiology,hospital")
            }
            alt={title}
            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Left Content */}
        <div>
          {/* Icon + Title */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex flex-row items-center gap-x-4">
              <div className="bg-red-200 p-4 rounded-full"><Icon className="text-red-500" size={28} /></div>
              <div className="h-[5px] w-[50px] bg-red-500"></div>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

          {/* Features */}
          <ul className="space-y-3 text-gray-700 mb-8">
            {listText.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                {item}
              </li>
            ))}
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
