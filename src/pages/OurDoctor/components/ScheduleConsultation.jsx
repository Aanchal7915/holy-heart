import React from "react";
import { FaCalendarAlt, FaUserMd, FaHeadset, FaPhoneAlt } from "react-icons/fa";

const features = [
  {
    title: "Easy Scheduling",
    desc: "Book appointments online or call our dedicated helpline",
    icon: <FaCalendarAlt className="text-3xl text-white" />,
  },
  {
    title: "Personalized Care",
    desc: "Customized treatment plans based on your condition",
    icon: <FaUserMd className="text-3xl text-white" />,
  },
  {
    title: "24/7 Support",
    desc: "Emergency care available round the clock",
    icon: <FaHeadset className="text-3xl text-white" />,
  },
];

export default function Consultation() {
  return (
    <section
      className="relative bg-cover bg-center py-20 px-6 text-white"
      style={{
        backgroundImage:
          "url('/assets/schedule-consul.jpg')", // Replace with your hospital bg image
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 container mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Schedule Your <span className="text-red-500">Consultation</span>
        </h2>
        <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
          Take the first step towards better heart health. Our expert cardiologists 
          provide personalized care and treatment plans tailored to your specific needs.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/10 p-6 rounded-xl shadow-lg hover:bg-white/20 transition"
            >
              <div className="flex justify-center mb-3">
                <div className="bg-red-500 p-4 rounded-full">{f.icon}</div>
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-200 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-red-600"
            onClick={() => window.location.href = "/book-appointment"}
          >
            Book Appointment Now
          </button>
          <a
            href="tel:01262279279"
            className="flex items-center justify-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100"
          >
            <FaPhoneAlt /> Call: 01262-279279
          </a>
        </div>

        {/* Hours */}
        <p className="mt-6 text-sm text-gray-300">
          <strong>Consultation Hours:</strong> Monday to Saturday, 9:00 AM – 8:00 PM
        </p>
        <p className="text-xs text-gray-400">
          Emergency services available 24/7 | Same-day appointments for urgent cases
        </p>
      </div>
    </section>
  );
}
