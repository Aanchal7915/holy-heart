import { FaHeartbeat, FaBullseye, FaHandsHelping } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
const aboutData = [
  {
    icon: <FaHeartbeat className="text-blue-600 text-3xl" />,
    title: "Why Choose Us?",
    description:
      "Holy Heart Advanced Cardiac Care & Research Center has been providing exceptional care since 2013 with state-of-the-art technology and experienced specialists.",
  },
  {
    icon: <FiEye className="text-blue-600 text-3xl" />,
    title: "Our Vision",
    description:
      "To redefine cardiovascular care delivery, scale greater heights, and set new standards in cardiac treatment excellence.",
  },
  {
    icon: <FaHandsHelping className="text-blue-600 text-3xl" />,
    title: "Our Mission",
    description:
      "To strive with unrelenting commitment towards clinical excellence and treat our patients with unparalleled care and compassion.",
  },
];

const AboutCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-xl">
    <div className="bg-blue-100 p-4 rounded-full mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold">
      Read More
    </button>
  </div>
);

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-blue-600">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutData.map((item, index) => (
            <AboutCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
