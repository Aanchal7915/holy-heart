import React from "react";
import { Calendar1Icon, Phone } from "lucide-react";

// DoctorCard Component
const DoctorCard = ({ doctor }) => {
  

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-3xl mx-auto mb-8">
      {/* Doctor Image */}
      <div className="w-full md:w-1/3">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Doctor Info */}
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
          <p className="text-red-500 font-semibold">{doctor.title}</p>
          <p className="text-gray-600 text-sm mt-1">{doctor.qualification}</p>
          <p className="text-gray-600 text-sm">
            {doctor.experience} | 🌐 {doctor.languages.join(", ")}
          </p>

          {/* Specializations */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800">Specializations</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {doctor.specializations.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800">Key Achievements</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {doctor.achievements.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </div>

          {/* Availability */}
          <p className="mt-4 text-sm text-gray-700">
            <strong>Availability:</strong> {doctor.availability}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 flex flex-wrap">
          <button className="flex items-center gap-x-4 py-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md">
             <Calendar1Icon/>Book Appointment
          </button>
          <button className="flex items-center gap-x-4 border border-gray-400 hover:bg-gray-100 text-gray-700 px-5 py-2 rounded-full font-semibold">
            <Phone/> Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DoctorsPage() {
  const doctors = [
    {
      name: "Dr. Rajesh Kumar Sharma",
      title: "Chief Cardiologist & Director",
      qualification: "MD (Medicine), DM (Cardiology)",
      experience: "15+ Years",
      languages: ["English", "Hindi"],
        image: "/assets/doctor/doctor1.jpg", // Replace with your image path
      specializations: [
        "Interventional Cardiology",
        "Coronary Angioplasty",
        "Pacemaker Implantation",
        "Heart Failure Management",
      ],
      achievements: [
        "Former Senior Resident at AIIMS, New Delhi",
        "Published 25+ research papers in international journals",
      ],
      availability: "Mon-Sat: 9:00 AM - 6:00 PM",
    },
    {
      name: "Dr. Priya Singh",
      title: "Senior Cardiologist",
      qualification: "MBBS, MD (Cardiology)",
      experience: "12+ Years",
      languages: ["English", "Hindi", "Punjabi"],
      image: "/assets/doctor/doctor2.jpg", // Broken link → fallback will load
      specializations: [
        "Pediatric Cardiology",
        "Congenital Heart Disease",
        "Echocardiography",
        "Preventive Cardiology",
      ],
      achievements: [
        "Fellowship in Pediatric Cardiology from PGI Chandigarh",
        "Expert in congenital heart defect management",
      ],
      availability: "Mon-Fri: 10:00 AM - 5:00 PM",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Meet Our <span className="text-red-500">Expert Team</span>
        </h2>
        <div className="bg-red-500 h-[5px] w-[100px] mx-auto mt-2 mt-0 mb-4 pt-0"></div>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          Our distinguished team of cardiologists brings together decades of
          experience, advanced training, and a commitment to providing the
          highest quality cardiac care.
        </p>

        {/* Doctor Cards */}
        <div className="mt-12 flex flex-col items-center">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  );
}
