import { FaHeartbeat, FaAmbulance, FaUserMd, FaMicroscope } from "react-icons/fa";

function CardiacFeature({ title, description, Icon }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
      <div className="bg-red-200 text-red-700 p-4 rounded-full mb-4">
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  const features = [
    {
      title: "11+ Years Experience",
      description: "Trusted cardiac care since 2013",
      Icon: FaHeartbeat,
    },
    {
      title: "24/7 Emergency Care",
      description: "Round-the-clock cardiac support",
      Icon: FaAmbulance,
    },
    {
      title: "Expert Specialists",
      description: "Highly qualified cardiac team",
      Icon: FaUserMd,
    },
    {
      title: "Advanced Technology",
      description: "State-of-the-art equipment",
      Icon: FaMicroscope,
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Why Choose Our Cardiac Services?
        </h2>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <CardiacFeature
            key={idx}
            title={feature.title}
            description={feature.description}
            Icon={feature.Icon}
          />
        ))}
      </div>
    </section>
  );
}
