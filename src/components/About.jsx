import React from "react";
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            Established 2013
          </span>

          <h2 className="text-4xl font-bold mt-4">
            Leading the Way in{" "}
            <span className="text-red-600">Cardiac Excellence</span>
          </h2>

          <p className="mt-6 text-gray-700 leading-relaxed">
            Holy Heart Advanced Cardiac Care & Research Centre stands as a
            beacon of hope and healing in Rohtak, Haryana. Since our
            establishment in 2013, we have been dedicated to providing
            world-class cardiovascular care to our community and beyond.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Our state-of-the-art facility combines cutting-edge medical
            technology with the expertise of highly skilled cardiac specialists,
            ensuring that every patient receives the highest standard of care in
            a compassionate and supportive environment.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div>
              <h3 className="text-2xl font-bold text-red-600">11+</h3>
              <p className="text-sm text-gray-600">Years of Excellence</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-600">10,000+</h3>
              <p className="text-sm text-gray-600">Patients Treated</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-600">24/7</h3>
              <p className="text-sm text-gray-600">Emergency Care</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-600">100%</h3>
              <p className="text-sm text-gray-600">Commitment</p>
            </div>
          </div>

          {/* Award */}
          <div className="flex items-center mt-8 bg-red-50 p-3 rounded-lg shadow-sm w-fit">
            <HeartPulse className="text-red-600 mr-2" />
            <span className="text-gray-800 font-medium">
              Award Winning Healthcare Excellence
            </span>
          </div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src="https://img.freepik.com/free-photo/group-doctors-standing-corridor-hospital_107420-84760.jpg"
            alt="Medical Team"
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
