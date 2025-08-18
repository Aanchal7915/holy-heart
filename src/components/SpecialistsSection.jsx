import { FaHeartbeat, FaStethoscope, FaChild, FaMicroscope, FaHospital, FaHeart, FaBullseye, FaHandsHelping } from "react-icons/fa";

const services = [
  {
    icon: <FaHeartbeat className="text-red-600" />,
    title: "24hrs Cardiac Backup, Fully Equipped ICCU",
    desc: "Intensive Coronary Care Unit for comprehensive monitoring and emergency care.",
  },
  {
    icon: <FaStethoscope className="text-red-600" />,
    title: "Angiography, Angioplasty & Stents",
    desc: "Advanced procedures to restore normal blood flow to the heart muscle.",
  },
  {
    icon: <FaMicroscope className="text-red-600" />,
    title: "Flat Panel Cath Lab 100kW Fixed",
    desc: "Fully equipped lab with diagnostic imaging for minimally invasive procedures.",
  },
  {
    icon: <FaChild className="text-red-600" />,
    title: "Pediatric Cardiology",
    desc: "Specialized services for cardiovascular diseases in children & infants.",
  },
  {
    icon: <FaHospital className="text-red-600" />,
    title: "Echo, TMT & Holter",
    desc: "Comprehensive cardiac diagnostic services including 24-hour monitoring.",
  },
  {
    icon: <FaHeartbeat className="text-red-600" />,
    title: "Pacemakers, CRT, CRT-D & AICD",
    desc: "Advanced cardiac rhythm management to prevent sudden cardiac death.",
  },
];

const cards = [
  {
    icon: <FaHeart className="text-blue-600 text-2xl" />,
    title: "Why Choose Us?",
    desc: "Holy Heart Advanced Cardiac Care & Research Center has been providing exceptional care since 2013 with state-of-the-art technology and experienced specialists.",
  },
  {
    icon: <FaBullseye className="text-blue-600 text-2xl" />,
    title: "Our Vision",
    desc: "To redefine cardiovascular care delivery, scale greater heights, and set new standards in cardiac treatment excellence.",
  },
  {
    icon: <FaHandsHelping className="text-blue-600 text-2xl" />,
    title: "Our Mission",
    desc: "To strive with unrelenting commitment towards clinical excellence and treat our patients with unparalleled care and compassion.",
  },
];

export default function HomePageSections() {
  return (
    <>
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-4">We Specialize In</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Comprehensive cardiac care services with state-of-the-art technology
          and experienced specialists dedicated to your heart health.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            {services.slice(0, 3).map((service, idx) => (
              <div key={idx} className="bg-white shadow rounded-2xl p-6">
                <h4 className="font-bold flex items-center gap-2">
                  {service.icon} {service.title}
                </h4>
                <p className="text-sm text-gray-600 mt-2">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center">
            <img
              src="/src/assets/home-heart.jpg"
              alt="Human Heart"
              className="w-72 md:w-96"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {services.slice(3).map((service, idx) => (
              <div key={idx} className="bg-white shadow rounded-2xl p-6">
                <h4 className="font-bold flex items-center gap-2">
                  {service.icon} {service.title}
                </h4>
                <p className="text-sm text-gray-600 mt-2">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
            ➜ View All Services
          </button>
        </div>
      </section>

      <section className="bg-[#2563eb] py-16 px-2">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg flex flex-col items-center px-8 py-10 text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-600 mb-6">{card.desc}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full transition">
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
