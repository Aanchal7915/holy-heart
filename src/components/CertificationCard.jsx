import React from "react";

const CertificationCard = ({ cert }) => {
  const fallbackIcon =
    "https://via.placeholder.com/40x40.png?text=Icon"; // fallback image

  const handleError = (e) => {
    e.target.src = fallbackIcon;
  };

  return (
    <div className="flex items-start gap-3 bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Icon */}
      <img
        src={cert.icon}
        alt={cert.title}
        onError={handleError}
        className="w-10 h-10"
      />

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
      icon: "/aha.png",
    },
    {
      title: "National Board of Examinations (NBE)",
      subtitle: "Board-certified specialists",
      icon: "/nbe.png",
    },
    {
      title: "Cardiological Society of India (CSI)",
      subtitle: "Active CSI members",
      icon: "/csi.png",
    },
    {
      title: "Indian Association of Cardiovascular Surgeons",
      subtitle: "Professional membership maintained",
      icon: "/invalid.png", // broken → will show fallback
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900">
          Professional Certifications
        </h2>
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
