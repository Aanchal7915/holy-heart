import React from "react";
import { ShieldCheck, Users, Star } from "lucide-react";

const CertificationsPage = () => {
  const certifications = [
    "ISO 9001:2015 Quality Management",
    "NABH Hospital Accreditation",
    "Fire Safety Compliance Certificate",
    "Pollution Control Board Clearance",
    "Bio-Medical Waste Management License",
    "Emergency Response Certification",
  ];

  const memberships = [
    "Indian Medical Association (IMA)",
    "Cardiological Society of India (CSI)",
    "Haryana Medical Association",
    "American College of Cardiology",
    "European Society of Cardiology",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        
        {/* Certifications & Compliance */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="text-green-500 w-6 h-6" />
            <h2 className="text-xl font-bold">Certifications & Compliance</h2>
          </div>
          <ul className="space-y-3">
            {certifications.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Professional Memberships */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-blue-500 w-6 h-6" />
            <h2 className="text-xl font-bold">Professional Memberships</h2>
          </div>
          <ul className="space-y-3">
            {memberships.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>

          {/* Research Contributions */}
          <div className="mt-6 bg-gray-100 rounded-xl p-4 border-l-4 border-yellow-400">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-500 w-5 h-5" />
              <h3 className="font-semibold">Research Contributions</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Our medical team has published over 25 research papers in
              international cardiology journals and regularly participates in
              medical conferences worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsPage;
