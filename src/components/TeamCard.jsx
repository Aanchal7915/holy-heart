import React from "react";

// TeamCard Component
const TeamCard = ({ team }) => {
  const fallbackIcon =
    "https://via.placeholder.com/80x80.png?text=Icon"; // fallback image

  const handleImageError = (e) => {
    e.target.src = fallbackIcon;
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
      {/* Icon */}
      <img
        src={team.icon}
        alt={team.title}
        onError={handleImageError}
        className="w-16 h-16 mb-4"
      />

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">{team.title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-2">{team.description}</p>

      {/* Stats */}
      <span className="mt-4 inline-block bg-red-100 text-red-600 font-semibold px-4 py-1 rounded-full text-sm">
        {team.stats}
      </span>
    </div>
  );
};

// Main Component
export default function MedicalTeam() {
  const teams = [
    {
      title: "Cardiac Nursing Team",
      description:
        "Specialized cardiac nurses trained in intensive coronary care, patient monitoring, and emergency response.",
      stats: "15+ Nurses",
      icon: "/nurse.png", // replace with real icon path
    },
    {
      title: "Cardiac Technicians",
      description:
        "Certified technicians operating advanced cardiac equipment including cath lab and diagnostic machines.",
      stats: "8+ Technicians",
      icon: "/invalid.png", // broken → fallback loads
    },
    {
      title: "Emergency Response Team",
      description:
        "24/7 emergency medical team ready for cardiac emergencies and critical care situations.",
      stats: "24/7 Available",
      icon: "/emergency.png",
    },
    {
      title: "Administrative Staff",
      description:
        "Dedicated team ensuring smooth hospital operations, patient coordination, and appointment management.",
      stats: "10+ Staff",
      icon: "/admin.png",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Complete <span className="text-red-500">Medical Team</span>
        </h2>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          Beyond our expert cardiologists, we have a dedicated team of healthcare
          professionals ensuring comprehensive patient care at every step.
        </p>

        {/* Team Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teams.map((team, index) => (
            <TeamCard key={index} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
}
