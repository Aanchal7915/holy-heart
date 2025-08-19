import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaPhoneAlt, FaClock, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

export default function ConsultationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    department: "",
    message: "",
    bookingType: "online",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10 px-6 py-6">
      {/* Left Form Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-6">
        <h2 className="text-2xl font-bold mb-2 text-center">Request A Consultation</h2>
        <div className="bg-red-500 h-[5px] w-[100px] mx-auto mt-0 mb-4 pt-0"></div>
        <p className="text-gray-600 mb-6">
          Book your appointment with our cardiac specialists
        </p>

        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0 p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0  p-3 rounded-lg"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0  p-3 rounded-lg"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0  p-3 rounded-lg"
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0  p-3 rounded-lg"
            />
          </div>

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0  p-3 rounded-lg"
          >
            <option value="">Select Department</option>
            <option value="cardiology">Cardiology</option>
            <option value="pediatric">Pediatric Cardiology</option>
            <option value="diagnostics">Diagnostics</option>
          </select>

          <textarea
            name="message"
            placeholder="Describe your symptoms or any specific concerns..."
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-0  p-3 rounded-lg"
          />

          {/* Booking Type */}
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="bookingType"
                value="online"
                checked={form.bookingType === "online"}
                onChange={handleChange}
              />
              Online Consultation (₹600)
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="bookingType"
                value="visit"
                checked={form.bookingType === "visit"}
                onChange={handleChange}
              />
              In-Person Visit
            </label>
          </div>

          <button className="flex flex-row items-center justify-center gap-x-2 w-full bg-red-600 text-white font-semibold py-3 rounded-lg mt-4">
            <MdPayment className="text-xl"/> Pay Now – ₹600
          </button>
        </form>
      </div>

      {/* Right Emergency Info Section */}
      <div className="space-y-6 flex flex-col justify-center">
        <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-2">Emergency Situations?</h3>
          <p className="mb-4">We are here to help 24/7</p>
          <div className="bg-red-700 p-4 rounded-lg flex items-center gap-3">
            <FaPhoneAlt className="text-2xl" />
            <div>
              <p className="font-bold text-lg">01262-279279</p>
              <p className="text-sm">Available 24 hours a day, 7 days a week</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex flex-row gap-x-2 items-center"><TiTick className="text-green-500 text-lg"/> Immediate cardiac emergency response</li>
            <li className="flex flex-row gap-x-2 items-center"><TiTick className="text-green-500 text-lg"/>  Advanced life support ambulance</li>
            <li className="flex flex-row gap-x-2 items-center"><TiTick className="text-green-500 text-lg"/>  Expert cardiac team on standby</li>
            <li className="flex flex-row gap-x-2 items-center"><TiTick className="text-green-500 text-lg"/>  State-of-the-art emergency facilities</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-6">
          <h4 className="font-bold text-lg mb-3">Contact Information</h4>
          <p className="text-gray-600 mb-2 flex flex-row items-center gap-x-2">
            <span className="bg-blue-100 p-2 rounded-full "><FaMapMarkerAlt className="w-4 h-4 text-blue-600" /></span> 330, Vinay Nagar, Delhi Bypass Chowk, Rohtak - 124001
          </p>
          <p className="text-gray-600 mb-2 flex flex-row items-center gap-x-2"><span className="p-2 rounded-full bg-green-100"><FaEnvelope className="w-4 h-4 text-green-600" /> </span>holyhearthospital@gmail.com</p>
          <p className="text-gray-600 flex flex-row items-center gap-x-2"><span className="p-2 rounded-full bg-purple-100"><FaClock className="w-4 h-4 text-purple-600" /> </span>Mon-Sat: 9:00 AM - 8:00 PM</p>
        </div>
      </div>
    </div>
  );
}
