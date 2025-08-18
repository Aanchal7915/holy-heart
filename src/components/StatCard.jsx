import React from "react";

const StatCard = ({ item }) => {
  const fallbackIcon =
    "https://via.placeholder.com/50x50.png?text=Icon"; // fallback

  const handleError = (e) => {
    e.target.src = fallbackIcon;
  };

  return (
    <div className="flex flex-col items-center text-white">
      {/* Icon */}
      <img
        src={item.icon}
        alt={item.label}
        onError={handleError}
        className="w-12 h-12 mb-3"
      />

      {/* Number */}
      <h3 className="text-3xl font-bold">{item.value}</h3>

      {/* Label */}
      <p className="mt-1 text-sm opacity-90">{item.label}</p>
    </div>
  );
};

export default function TeamStats() {
  const stats = [
    {
      value: "4",
      label: "Cardiologists",
      icon: "/cardio.png", // replace with real path
    },
    {
      value: "15+",
      label: "Cardiac Nurses",
      icon: "/nurse.png",
    },
    {
      value: "8+",
      label: "Technicians",
      icon: "/invalid.png", // broken → fallback loads
    },
    {
      value: "45+",
      label: "Total Staff",
      icon: "/staff.png",
    },
  ];

  return (
    <section className="bg-red-600 py-16 px-6">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white">
          Our Team by Numbers
        </h2>
        <p className="text-white opacity-80 mt-2">
          Committed to excellence in cardiac care
        </p>

        {/* Stats Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, i) => (
            <StatCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
