import React from "react";

const WhyChoose = () => {
  const features = [
    {
      title: "Advanced Medical Infrastructure",
      description:
        "State-of-the-art cardiac catheterization lab with flat panel imaging system and comprehensive diagnostic facilities.",
      image:
        "https://images.unsplash.com/photo-1588776814546-ec7b82a2b2c7?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Experienced Medical Team",
      description:
        "Board-certified cardiologists and trained nursing staff with years of experience in cardiac care and emergency medicine.",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37c23?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Comprehensive Cardiac Services",
      description:
        "Complete range of cardiac services from preventive care to complex procedures including angioplasty, pacemaker implantation.",
      image:
        "https://images.unsplash.com/photo-1588774069629-1ec6a221a0a4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "24/7 Emergency Services",
      description:
        "Round-the-clock emergency cardiac care with immediate response team and advanced life support ambulance services.",
      image:
        "https://images.unsplash.com/photo-1624433425069-4bcb1e2f2f2e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Quality & Safety Standards",
      description:
        "Adherence to international quality standards with continuous monitoring and improvement of patient safety protocols.",
      image:
        "https://images.unsplash.com/photo-1580281657525-6df785c22b76?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Patient-Centered Approach",
      description:
        "Personalized treatment plans with compassionate care, clear communication, and support throughout the healing journey.",
      image:
        "https://images.unsplash.com/photo-1606813902778-d61d8c0b53d7?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Why Choose Holy Heart Hospital?</h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Discover what makes us the preferred choice for cardiac care in Rohtak
          and surrounding regions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
