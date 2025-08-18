import { useState } from "react";

function CardiacFeature({ title, description, image }) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
      <img
        src={imgSrc}
        alt={title}
        className="w-12 h-12 mb-4"
        onError={() =>
          setImgSrc("https://via.placeholder.com/48x48?text=⚕")
        }
      />
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
      image: "/service12.jpg",
    },
    {
      title: "24/7 Emergency Care",
      description: "Round-the-clock cardiac support",
      image: "/service12.jpg",
    },
    {
      title: "Expert Specialists",
      description: "Highly qualified cardiac team",
      image: "/service12.jpg",
    },
    {
      title: "Advanced Technology",
      description: "State-of-the-art equipment",
      image: "/service12.jpg",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Why Choose Our Cardiac Services?
        </h2>
        <div className="mt-2 h-1 w-24 mx-auto bg-red-500 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <CardiacFeature
            key={idx}
            title={feature.title}
            description={feature.description}
            image={feature.image}
          />
        ))}
      </div>
    </section>
  );
}
