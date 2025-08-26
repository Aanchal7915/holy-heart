import React from "react";
import { CheckCircle, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { LuHeartPulse } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { CiStethoscope } from "react-icons/ci";
import { CiWavePulse1 } from "react-icons/ci";
import { RiHospitalLine } from "react-icons/ri";
import { FaPeopleRobbery } from "react-icons/fa6";
import { RiMicroscopeLine } from "react-icons/ri";
// Map string -> Lucide icon
const icons = {
  HeartBit: LuHeartPulse,
  Heart: GoHeart,
  Stethoscope: CiStethoscope,
  Wave: CiWavePulse1,
  Hospital: RiHospitalLine,
  People: FaPeopleRobbery,
  Microscope: RiMicroscopeLine

};

const ServiceCard = ({ title, description, image, reactIconName, listText, index }) => {
  const Icon = icons[reactIconName] || Heart;

  return (
    <section className="w-full bg-white py-16 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Right Image */}
        <div className={`${index%2?null:"md:order-2"}`}>
          <img
            src={image}
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
              onClick={e => {
                e.preventDefault();
                window.location.href = "/book-appointment";
              }}
            >
              Book Consultation
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCard;
