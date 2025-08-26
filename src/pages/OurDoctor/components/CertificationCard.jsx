import React from "react";
import { PiMedal } from "react-icons/pi";

const CertificationCard = ({ cert }) => {
 

  return (
    <div className="flex items-start gap-3 bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Icon */}
      <span className="p-4 rounded-full bg-red-100">
      <PiMedal className="text-red-600 text-xl"/>
      </span>

      {/* Text */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {cert.title}
        </h3>
        <p className="text-gray-600 text-sm">{cert.subtitle}</p>
      </div>
    </div>
  );
};

export default function Certifications() {
  const certifications = [
    {
      title: "American Heart Association (AHA) Guidelines",
      subtitle: "All procedures follow AHA standards",
    },
    {
      title: "National Board of Examinations (NBE)",
      subtitle: "Board-certified specialists",
    },
    {
      title: "Cardiological Society of India (CSI)",
      subtitle: "Active CSI members",
    },
    {
      title: "Indian Association of Cardiovascular Surgeons",
      subtitle: "Professional membership maintained",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900">
          Professional Certifications
        </h2>
        <div className="mt-2 h-1 w-24 mx-auto bg-red-500 rounded-full"></div>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Our medical team maintains the highest professional standards
          through continuous education and certification.
        </p>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <CertificationCard key={i} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
