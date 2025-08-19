import React from "react";
import { Calendar, Phone } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="w-full flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-5xl bg-gradient-to-r from-red-700  to-blue-700 text-white rounded-2xl shadow-lg p-10 text-center">
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Experience Award-Winning Cardiac Care
        </h2>

        {/* Subtitle */}
        <p className="text-gray-100 mb-6">
          Join thousands of patients who have trusted us with their heart health
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-2 bg-white text-pink-600 px-6 py-3 rounded-full font-medium shadow hover:bg-gray-100 transition">
            <Calendar className="w-5 h-5" />
            Book Consultation
          </button>

          <button className="flex items-center justify-center gap-2 border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-blue-600 transition">
            <Phone className="w-5 h-5" />
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
