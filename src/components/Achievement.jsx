import React from "react";

const Achievements = () => {
  const stats = [
    { value: "5000+", label: "Successful Surgeries" },
    { value: "98%", label: "Success Rate" },
    { value: "15+", label: "Specialist Doctors" },
    { value: "24/7", label: "Emergency Support" },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-pink-600 to-indigo-600 text-white rounded-2xl shadow-lg">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          Our Achievements Speak for Themselves
        </h2>
        <p className="text-gray-200 mt-2">
          Numbers that reflect our commitment to excellence
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((item, index) => (
          <div key={index}>
            <h3 className="text-3xl md:text-4xl font-bold">{item.value}</h3>
            <p className="mt-2 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
