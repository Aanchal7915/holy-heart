import React from "react";

// DoctorCard Component with fallback image
const DoctorCard = ({ name, role, image }) => {
  const fallbackImage = "https://via.placeholder.com/300x400?text=Doctor+Image";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-4 w-64">
      <img
        src={image}
        alt={name}
        onError={handleImageError}
        className="w-40 h-40 object-cover rounded-full border-4 border-red-500"
      />
      <h3 className="mt-4 text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  );
};

export default function DoctorsSection() {
  const doctors = [
    {
      name: "Dr. John Doe",
      role: "Cardiologist",
      image: "/doctor1.jpg", // if this fails → fallback will load
    },
    {
      name: "Dr. Jane Smith",
      role: "Heart Surgeon",
      image: "/invalid.jpg", // broken link → fallback loads
    },
    {
      name: "Dr. Raj Mehta",
      role: "Cardiac Specialist",
      image: "/doctor3.jpg",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-600 mb-2">Home &gt; Our Doctors</p>
        <h2 className="text-4xl font-bold">
          Expert <span className="text-red-500">Cardiologists</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Meet our team of highly qualified cardiac specialists dedicated to
          providing exceptional cardiovascular care. With years of experience
          and advanced training, our doctors are committed to your heart health.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-md">
            📅 Book Consultation
          </button>
          <a
            href="tel:01262279279"
            className="border border-gray-400 px-6 py-3 rounded-full text-gray-700 font-semibold hover:bg-gray-200"
          >
            📞 Emergency: 01262-279279
          </a>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-3xl font-bold text-red-500">11+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-3xl font-bold text-red-500">5000+</h3>
            <p className="text-gray-600">Successful Procedures</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-3xl font-bold text-red-500">24/7</h3>
            <p className="text-gray-600">Emergency Care</p>
          </div>
        </div>

        {/* Doctors List */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          {doctors.map((doc, index) => (
            <DoctorCard key={index} {...doc} />
          ))}
        </div>
      </div>
    </section>
  );
}
