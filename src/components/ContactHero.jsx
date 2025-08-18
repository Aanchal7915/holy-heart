import { FaPhoneAlt } from "react-icons/fa";
import { MdEmergency } from "react-icons/md";

export default function ContactHero() {
  return (
    <section
      className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/contact-hero.jpg')" }} // <-- Replace with your uploaded hero image path
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative text-center text-white px-4">
        <p className="mb-2 text-sm">Home • Contact Us</p>
        <h1 className="text-4xl md:text-5xl font-bold">
          Get In <span className="text-red-500">Touch</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-200">
          We're here to help you with your cardiac care needs. Contact our
          experienced team for appointments, consultations, or emergency
          assistance.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          <div className="flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-lg">
            <FaPhoneAlt className="text-red-500 text-xl" />
            <div className="text-left">
              <p className="text-sm text-gray-200">Emergency Helpline</p>
              <p className="font-bold">01262-279279</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-lg">
            <MdEmergency className="text-blue-400 text-xl" />
            <div className="text-left">
              <p className="text-sm text-gray-200">Available</p>
              <p className="font-bold">24/7 Emergency</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
