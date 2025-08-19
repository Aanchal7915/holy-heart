import React from "react";

const StatCard = ({ item }) => {

  return (
    <div className="flex flex-col items-center text-white">
      {/* Number */}
      <h3 className="text-4xl font-bold">{item.value}</h3>

      {/* Label */}
      <p className="mt-1 text-sm text-xl">{item.label}</p>
    </div>
  );
};

export default function TeamStats() {
  const stats = [
    {
      value: "4",
      label: "Cardiologists",
    },
    {
      value: "15+",
      label: "Cardiac Nurses",
    },
    {
      value: "8+",
      label: "Technicians",
    },
    {
      value: "45+",
      label: "Total Staff",
    },
  ];

  return (
    <section className="py-16 px-6 ">
      <div className="bg-red-700 py-10 md:py-20 container mx-auto text-center md:rounded-2xl">
        {/* Title */}
        <h2 className="text-4xl font-bold text-white">
          Our Team by Numbers
        </h2>
        <p className="text-white mt-2 text-xl">
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
