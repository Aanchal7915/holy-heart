import React from "react";
import { FaHeartPulse } from "react-icons/fa6";
import { Heart, Target, Shield, Users, Cpu, Clock, Divide } from "lucide-react";
import { IoEyeOutline } from "react-icons/io5";
const MissionVision = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20 bg-gradient-to-l from-red-700/10  to-blue-700/10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Our Mission & Vision</h2>
        <div className="bg-red-500 h-[5px] w-[100px] mx-auto mt-4 mb-6 pt-0"></div>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Guided by our core values and unwavering commitment to excellence in cardiac care
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="group transition-transform hover:shadow-xl hover:translate-y-2  bg-white shadow-md rounded-2xl p-6 text-center">
          <div className="group-hover:bg-red-600 transition-colors duration-300 p-4 bg-red-200 mx-auto w-fit rounded-full mb-4">
            <FaHeartPulse className="group-hover:text-white transition-colors duration-300 text-red-600" size={30} />
          </div>
          <h3 className="text-xl font-bold mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm">
            To strive with unrelenting commitment towards clinical excellence and treat our patients
            with unparalleled care and compassion, ensuring the highest standards of cardiovascular healthcare.
          </p>
        </div>

        <div className="group transition-transform hover:shadow-xl hover:translate-y-2 bg-white shadow-md rounded-2xl p-6 text-center">
          <div className="group-hover:bg-blue-600 transition-colors duration-300 p-4 bg-blue-200 mx-auto w-fit rounded-full mb-4">
            <IoEyeOutline className="group-hover:text-white transition-colors duration-300 text-blue-500" size={30} />
          </div>
          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p className="text-gray-600 text-sm">
            To redefine cardiovascular care delivery, scale greater heights, and set new standards
            in cardiac treatment excellence while remaining accessible to our community.
          </p>
        </div>

        <div className="group transition-transform hover:shadow-xl hover:translate-y-2 bg-white shadow-md rounded-2xl p-6 text-center">
          <div className="group-hover:bg-green-600 transition-colors duration-300 p-4 bg-green-200 mx-auto w-fit rounded-full mb-4">
            <Shield className="group-hover:text-white transition-colors duration-300 text-green-500" size={30} />
          </div>
          <h3 className="text-xl font-bold mb-2">Our Values</h3>
          <p className="text-gray-600 text-sm">
            Compassion, Excellence, Innovation, and Integrity guide everything we do.
            We believe in treating every patient with dignity, respect, and the highest level of expertise.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="text-center mb-10 bg-white rounded-xl pt-6 pb-6">
        <h3 className="text-3xl font-bold">Our Core Principles</h3>

        <div className="grid md:grid-cols-4 gap-6 text-center bg-white rounded">
          <div className="rounded-2xl p-6">
            <div className="bg-red-200 w-fit mx-auto p-4 rounded-full">
              <Heart className="text-red-400" size={32} />
            </div>
            <h4 className="font-semibold mb-2">Patient-Centric Care</h4>
            <p className="text-gray-600 text-sm">
              Every decision revolves around patient wellbeing.
            </p>
          </div>

          <div className="bg-white  rounded-2xl p-6">
            <div className="bg-blue-200 w-fit mx-auto p-4 rounded-full">
            <Cpu className="text-blue-400 mx-auto" size={32} /></div>
            <h4 className="font-semibold mb-2">Advanced Technology</h4>
            <p className="text-gray-600 text-sm">
              State-of-the-art medical equipment and techniques.
            </p>
          </div>

          <div className="bg-white  rounded-2xl p-6">
            <div className="bg-green-200 w-fit mx-auto p-4 rounded-full">
            <Users className="text-green-500" size={32} /></div>
            <h4 className="font-semibold mb-2">Expert Team</h4>
            <p className="text-gray-600 text-sm">
              Highly skilled and experienced medical professionals.
            </p>
          </div>

          <div className="bg-white  rounded-2xl p-6">
            <div className="bg-purple-200 w-fit mx-auto p-4 rounded-full">
            <Clock className="text-purple-500" size={32} /></div>
            <h4 className="font-semibold mb-2">24/7 Availability</h4>
            <p className="text-gray-600 text-sm">
              Round-the-clock emergency cardiac care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
