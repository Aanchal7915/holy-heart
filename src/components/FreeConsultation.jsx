import { useState } from "react";
import { Phone, Calendar } from "lucide-react";

function StatCard({ number, label, image }) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={imgSrc}
        alt={label}
        className="w-10 h-10 mb-3"
        onError={() =>
          setImgSrc("https://via.placeholder.com/40x40?text=⚕")
        }
      />
      <h3 className="text-2xl font-bold text-white">{number}</h3>
      <p className="text-sm text-gray-200 mt-1">{label}</p>
    </div>
  );
}

export default function FreeConsultation() {
  const stats = [
    { number: "5000+", label: "Successful Procedures", image: "/service13.jpg" },
    { number: "11+", label: "Years Experience", image: "/service13.jpg" },
    { number: "24/7", label: "Emergency Services", image: "/service13.jpg" },
    { number: "98%", label: "Success Rate", image: "/service13.jpg" },
  ];

  return (
    <section className="bg-red-600/80 py-16 px-6 lg:px-20 text-center text-white">
      <h2 className="text-3xl font-bold mb-4">Get Immediate Free Consultation!</h2>
      <p className="text-lg mb-8">
        Fill out the form to get an appointment. You can also call us on{" "}
        <span className="font-semibold">01262-279279</span> for immediate assistance.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
        <button
          className="flex flex-row items-center gap-x-2 bg-white text-red-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          onClick={() => window.location.href = "/book-appointment"}
        >
          <Calendar/> Book Appointment Now
        </button>
        <a
          href="tel:01262279279"
          className="flex items-center gap-3 bg-red-700 px-6 py-3 rounded-full shadow"
        >
          <span className="text-xl"><Phone/></span>
          <span>
            <p className="text-sm">Emergency Helpline</p>
            <p className="text-lg font-bold">01262-279279</p>
          </span>
        </a>
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            number={stat.number}
            label={stat.label}
            image={stat.image}
          />
        ))}
      </div> */}
    </section>
  );
}
