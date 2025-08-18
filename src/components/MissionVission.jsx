import React from "react";
import { Heart, Target, Shield, Users, Cpu, Clock } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Our Mission & Vision</h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Guided by our core values and unwavering commitment to excellence in cardiac care
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <Heart className="text-red-500 mx-auto mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm">
            To strive with unrelenting commitment towards clinical excellence and treat our patients 
            with unparalleled care and compassion, ensuring the highest standards of cardiovascular healthcare.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <Target className="text-blue-500 mx-auto mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-600 text-sm">
            To redefine cardiovascular care delivery, scale greater heights, and set new standards 
            in cardiac treatment excellence while remaining accessible to our community.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <Shield className="text-green-500 mx-auto mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-gray-600 text-sm">
            Compassion, Excellence, Innovation, and Integrity guide everything we do. 
            We believe in treating every patient with dignity, respect, and the highest level of expertise.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold">Our Core Principles</h3>
      </div>
      <div className="grid md:grid-cols-4 gap-6 text-center">
        <div className="bg-white shadow rounded-2xl p-6">
          <Heart className="text-red-400 mx-auto mb-3" size={32} />
          <h4 className="font-semibold mb-2">Patient-Centric Care</h4>
          <p className="text-gray-600 text-sm">
            Every decision revolves around patient wellbeing.
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <Cpu className="text-blue-400 mx-auto mb-3" size={32} />
          <h4 className="font-semibold mb-2">Advanced Technology</h4>
          <p className="text-gray-600 text-sm">
            State-of-the-art medical equipment and techniques.
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <Users className="text-green-500 mx-auto mb-3" size={32} />
          <h4 className="font-semibold mb-2">Expert Team</h4>
          <p className="text-gray-600 text-sm">
            Highly skilled and experienced medical professionals.
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <Clock className="text-purple-500 mx-auto mb-3" size={32} />
          <h4 className="font-semibold mb-2">24/7 Availability</h4>
          <p className="text-gray-600 text-sm">
            Round-the-clock emergency cardiac care.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
