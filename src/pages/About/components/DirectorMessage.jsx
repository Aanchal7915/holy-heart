import React from "react";
import { ImQuotesLeft } from "react-icons/im";
const DirectorMessage = () => {
  return (
    <section className="py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-0 p-0">Message from Our Director
      </h2>
      <div className="bg-red-500 h-[5px] w-[100px] mx-auto mt-0 mb-6 pt-0 mt-2"></div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Image & Info */}
        <div className="text-center md:text-left">
          <img
            src="/assets/about/dr.rajesh.jpg"
            alt="Director"
            className="rounded-2xl shadow-lg mx-auto md:mx-0"
          />
          <div className="mt-6">
            <h3 className="text-xl font-bold">
              Dr. Rajesh Kumar Sharma
            </h3>
            <p className="text-red-600 font-medium">
              Director & Chief Cardiologist
            </p>
            <p className="text-gray-600 mt-2">
              MD, DM (Cardiology), FACC
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>✔️ 20+ Years Experience</li>
              <li>✔️ Former Senior Consultant, AIIMS</li>
              <li>✔️ Fellowship in Interventional Cardiology</li>
            </ul>
          </div>
        </div>

        {/* Right Side - Message */}
        <div>

          <ImQuotesLeft className="text-red-200 text-6xl mb-2" />

          <p className="text-gray-700 mb-4">
            Welcome to Holy Heart Advanced Cardiac Care & Research Center.
            As the Director and Chief Cardiologist, I am proud to lead a team
            of dedicated healthcare professionals who share a common vision of
            providing world-class cardiac care to our community.
          </p>
          <p className="text-gray-700 mb-4">
            Since our establishment in 2013, we have continuously strived to
            bridge the gap between advanced medical technology and compassionate
            patient care. Our commitment to excellence has made us a trusted
            name in cardiovascular healthcare throughout Haryana and neighboring
            regions.
          </p>
          <p className="text-gray-700 mb-4">
            Every patient who walks through our doors is not just a case, but a
            person with hopes, fears, and loved ones who care about them. This
            understanding drives our approach to medicine – one that combines
            clinical expertise with genuine empathy and respect for human dignity.
          </p>
          <p className="text-gray-700 mb-6">
            Our state-of-the-art facilities, including our advanced
            catheterization laboratory and 24-hour intensive cardiac care unit,
            are designed to provide the highest level of care. But technology
            alone cannot heal – it is the skill, dedication, and compassion of
            our medical team that truly makes the difference.
          </p>

          {/* Highlighted Quote */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm mb-6">
            <p className="text-red-800 font-medium">
              “Your heart is precious, and we treat it as such. Trust us with your
              cardiac health, and experience the difference that genuine care and
              medical excellence can make.”
            </p>
          </div>

          <p className="font-normal text-2xl"
            style={{ fontFamily: "Pacifico" }}
          >Dr. Rajesh Kumar Sharma</p>
          <p className="text-gray-600 text-lg">
            Director & Chief Cardiologist
          </p>
          <p className="text-gray-600 text-sm">
            Holy Heart Advanced Cardiac Care & Research Center
          </p>
        </div>
      </div>
    </section>
  );
};

export default DirectorMessage;
