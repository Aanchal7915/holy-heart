import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Advanced Medical Infrastructure",
      description:
        "State-of-the-art cardiac catheterization lab with flat panel imaging system and comprehensive diagnostic facilities.",
      image:
        "/assets/about/about1.jpg", // Update with the correct path to your image
    },
    {
      title: "Experienced Medical Team",
      description:
        "Board-certified cardiologists and trained nursing staff with years of experience in cardiac care and emergency medicine.",
      image:
        "/assets/about/about2.jpg"
    },
    {
      title: "Comprehensive Cardiac Services",
      description:
        "Complete range of cardiac services from preventive care to complex procedures including angioplasty, pacemaker implantation.",
      image:
        "/assets/about/about3.jpg"
    },
    {
      title: "24/7 Emergency Services",
      description:
        "Round-the-clock emergency cardiac care with immediate response team and advanced life support ambulance services.",
      image:
        "/assets/about/about1.jpg"
    },
    {
      title: "Quality & Safety Standards",
      description:
        "Adherence to international quality standards with continuous monitoring and improvement of patient safety protocols.",
      image:
        "/assets/about/about4.jpg"
    },
    {
      title: "Patient-Centered Approach",
      description:
        "Personalized treatment plans with compassionate care, clear communication, and support throughout the healing journey.",
      image:
        "/assets/about/about5.jpg"
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Why Choose Holy Heart Hospital?</h2>
        <div className="bg-red-500 h-[5px] w-[100px] mx-auto mt-4 mb-6 pt-0"></div>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Discover what makes us the preferred choice for cardiac care in Rohtak
          and surrounding regions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="group bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover group-hover:scale-110 transitio-transform duration-300"
            />
            <div className="p-6 group-hover:scale-102 transitio-transform duration-300">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-red-600 transition-colors duration-300">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
