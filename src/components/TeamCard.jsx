import React from "react";

import { LiaHeadphonesSolid } from "react-icons/lia";
import { TbNurse } from "react-icons/tb";
import { MdBiotech } from "react-icons/md";
import { FaTeamspeak } from "react-icons/fa";
import { FaSteamSymbol } from "react-icons/fa6";
// TeamCard Component
const icons = {
  nurse: TbNurse,
  headphone: FaTeamspeak,
  tech: MdBiotech,
  team: FaSteamSymbol
}
const TeamCard = ({ team }) => {

  const Icon = icons[team.icon];
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
      {/* Icon */}
      <span className="bg-red-100 p-6 rounded-full">
        <Icon className="text-red-700 text-4xl"/>
      </span>
      {team.icon}
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
      icon: "nurse", // replace with real icon path
    },
    {
      title: "Cardiac Technicians",
      description:
        "Certified technicians operating advanced cardiac equipment including cath lab and diagnostic machines.",
      stats: "8+ Technicians",
      icon: "tech", // broken → fallback loads
    },
    {
      title: "Emergency Response Team",
      description:
        "24/7 emergency medical team ready for cardiac emergencies and critical care situations.",
      stats: "24/7 Available",
      icon: "team",
    },
    {
      title: "Administrative Staff",
      description:
        "Dedicated team ensuring smooth hospital operations, patient coordination, and appointment management.",
      stats: "10+ Staff",
      icon: "headphone",
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
