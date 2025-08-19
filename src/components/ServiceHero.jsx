// import React from "react";
// // import { Button } from "@/components/ui/button";
// import { Phone } from "lucide-react";
// import { motion } from "framer-motion";

// const ServiceHero = () => {
//   return (
//     <section
//        className="relative w-full h-[90vh] bg-cover bg-center flex items-center"
//       style={{
//         backgroundImage: `url("/service1.jpg"), url("/assets/service-hero.jpg")`,
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* Content */}
//           <div className="relative z-10 max-w-4xl px-6 md:px-12 text-white">
//         <p className="text-sm mb-3">
//           Home &gt; <span className="text-gray-300">Our Services</span>
//         </p>
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">
//           Our <span className="text-red-500">Specialties</span>
//         </h1>
//         <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
//           Comprehensive cardiac care services with state-of-the-art technology
//           and experienced specialists. We provide advanced cardiovascular
//           treatments with compassionate patient care.
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-col md:flex-row gap-4 justify-center">
//           <motion.a
//             href="#book"
//             whileHover={{ scale: 1.05 }}
//             className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold shadow-lg"
//           >
//             Book Consultation
//           </motion.a>

//           <motion.a
//             href="tel:01262279279"
//             whileHover={{ scale: 1.05 }}
//             className="px-6 py-3 bg-white/10 border border-white/30 backdrop-blur-md text-white rounded-full flex items-center gap-2 font-semibold shadow-lg"
//           >
//             <Phone size={18} /> Emergency: 01262-279279
//           </motion.a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceHero;



import React from "react";
import { Heart, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const ServiceHero = () => {
  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url("/assets/service-hero.jpg")` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-12 text-white">
        {/* Breadcrumb */}
        <p className="text-sm mb-4">
          Home <span className="mx-2">›</span> Our Services
        </p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Our <span className="text-red-400">Specialties</span> 
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl leading-relaxed text-gray-200"
        >
        Comprehensive cardiac care services with state-of-the-art technology and experienced specialists. We provide advanced cardiovascular treatments with compassionate patient care.
        </motion.p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap">
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
          >
            <Heart size={20} /> Book Consultation
          </motion.a>

          <motion.a
            href="#visit"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            <Phone size={18} /> Emergency: 01262-279279
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
