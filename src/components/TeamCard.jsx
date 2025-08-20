
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LiaHeadphonesSolid } from "react-icons/lia";
import { TbNurse } from "react-icons/tb";
import { MdBiotech } from "react-icons/md";
import { FaTeamspeak } from "react-icons/fa";
import { FaSteamSymbol } from "react-icons/fa6";

const icons = {
  nurse: TbNurse,
  headphone: FaTeamspeak,
  tech: MdBiotech,
  team: FaSteamSymbol
};

function getStatValue(stats) {
  // Extract number from stats string
  const match = stats.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

const TeamCard = ({ team }) => {
  const Icon = icons[team.icon];
  const [count, setCount] = useState(1);
  const [restart, setRestart] = useState(false);
  const statValue = getStatValue(team.stats);
  useEffect(() => {
    let start = 1;
    let end = statValue;
    let duration = 2.2;
    let frame = 0;
    let totalFrames = Math.round(duration * 60);
    let increment = (end - start) / totalFrames;
    let raf;
    function animate() {
      frame++;
      let current = Math.round(start + increment * frame);
      if (current > end) current = end;
      setCount(current);
      if (frame < totalFrames) raf = requestAnimationFrame(animate);
    }
    setCount(1);
    frame = 0;
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [statValue, restart]);
  return (
    <motion.div
      whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 text-center cursor-pointer select-none"
      onMouseEnter={() => setRestart(r => !r)}
    >
      {/* Icon */}
      <span className="bg-red-100 p-6 rounded-full">
        <Icon className="text-red-700 text-4xl"/>
      </span>
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">{team.title}</h3>
      {/* Description */}
      <p className="text-gray-600 text-sm mt-2">{team.description}</p>
      {/* Stats */}
      <span className="mt-4 inline-block bg-red-100 text-red-600 font-semibold px-4 py-1 rounded-full text-sm">
        {count}
        {team.stats.replace(/\d+/, "")}
      </span>
    </motion.div>
  );
};

export default function MedicalTeam() {
  const teams = [
    {
      title: "Cardiac Nursing Team",
      description:
        "Specialized cardiac nurses trained in intensive coronary care, patient monitoring, and emergency response.",
      stats: "15+ Nurses",
      icon: "nurse",
    },
    {
      title: "Cardiac Technicians",
      description:
        "Certified technicians operating advanced cardiac equipment including cath lab and diagnostic machines.",
      stats: "8+ Technicians",
      icon: "tech",
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
