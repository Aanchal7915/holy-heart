import React from "react";
import { FaAward, FaHeartbeat, FaHospital, FaCertificate } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { RiMedalFill } from "react-icons/ri";
import { PiMedalLight } from "react-icons/pi";
import { Shield } from "lucide-react";
// Sample awards data
const awards = [
  {
    year: "2023",
    title: "Excellence in Cardiac Care",
    organization: "Haryana Medical Association",
    description:
      "Recognized for outstanding contribution to cardiovascular healthcare in the region",
    icon: <TfiCup className="text-xl text-white" />,
  },
  {
    year: "2022",
    title: "Best Private Hospital",
    organization: "Healthcare Excellence Awards",
    description:
      "Awarded for maintaining highest standards of patient care and medical services",
    icon: <RiMedalFill className="text-xl text-white" />,
  },
  {
    year: "2021",
    title: "Quality Healthcare Provider",
    organization: "Indian Medical Association",
    description:
      "Certified for adherence to international quality and safety standards",
    icon: <PiMedalLight className="text-xl text-white" />,
  },
  {
    year: "2020",
    title: "NABH Accreditation",
    organization: "National Accreditation Board",
    description:
      "Accredited for quality and patient safety management systems",
    icon: <Shield className="text-xl text-white" />,
  },
];

const AwardsRecognition = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Awards & Recognition
        </h2>

        <div className="bg-red-500 h-[5px] w-[100px] mx-auto mb-6"></div>

        <p className="text-gray-600 mb-12">
          Our commitment to excellence has been recognized by prestigious
          medical organizations and healthcare bodies
        </p>

        {/* Awards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award, index) => (
            <div
              key={index}
              className="group bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >
              {/* Award Icon */}
              <div className="group-hover:scale-110 transition-transform duration-300 mb-4  bg-gradient-to-r from-red-700  to-blue-700 rounded-full p-4">{award.icon}</div>

              {/* Year */}
              <span className="bg-red-100 text-red-600 px-3 py-1 text-sm font-semibold rounded-full mb-3">
                {award.year}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {award.title}
              </h3>

              {/* Organization */}
              <p className="text-blue-600 font-medium text-sm mb-2">
                {award.organization}
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsRecognition;
