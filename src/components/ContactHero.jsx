import { FaPhoneAlt } from "react-icons/fa";
import { MdEmergency } from "react-icons/md";

// export default function ContactHero() {
//   return (
//     <section
//       className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
//       style={{ backgroundImage: "url('/assets/contact-hero.jpg')" }} // <-- Replace with your uploaded hero image path
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       <div className="relative text-center text-white px-4">
//         <p className="mb-2 text-sm">Home • Contact Us</p>
//         <h1 className="text-4xl md:text-5xl font-bold">
//           Get In <span className="text-red-500">Touch</span>
//         </h1>
//         <p className="mt-4 max-w-2xl mx-auto text-gray-200">
//           We're here to help you with your cardiac care needs. Contact our
//           experienced team for appointments, consultations, or emergency
//           assistance.
//         </p>

//         <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
//           <div className="flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-lg">
//             <FaPhoneAlt className="text-red-500 text-xl" />
//             <div className="text-left">
//               <p className="text-sm text-gray-200">Emergency Helpline</p>
//               <p className="font-bold">01262-279279</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-lg">
//             <MdEmergency className="text-blue-400 text-xl" />
//             <div className="text-left">
//               <p className="text-sm text-gray-200">Available</p>
//               <p className="font-bold">24/7 Emergency</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import { Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url("/assets/contact-hero.jpg")` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-12 text-white">
        {/* Breadcrumb */}
        <p className="text-sm mb-4">
          Home <span className="mx-2">›</span> Contact Us
        </p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Get In <span className="text-red-400">Touch</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl leading-relaxed text-gray-200"
        >
         We're here to help you with your cardiac care needs. Contact our experienced team for appointments, consultations, or emergency assistance.
        </motion.p>

        
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="flex items-center gap-3 bg-white/20 bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-lg">
            <FaPhoneAlt className="text-red-500 text-xl" />
            <div className="text-left">
              <p className="text-sm">Emergency Helpline</p>
              <p className="font-bold">01262-279279</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/20 bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-lg">
            <MdEmergency className="text-blue-400 text-xl" />
            <div className="text-left">
              <p className="text-sm">Available</p>
              <p className="font-bold">24/7 Emergency</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default ContactHero;

