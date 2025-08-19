import React from "react";
import { User, Mail, Phone, Calendar, Clipboard } from "lucide-react";

const WHATSAPP_PHONE = "919876543210"; // replace with your clinic's WhatsApp number

const BookAppointment = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fullName = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const date = formData.get("date");
    const department = formData.get("department");
    const message = formData.get("message");

    const text = `*New Appointment Request*
    
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Date: ${date}
Department: ${department}
Message: ${message || "N/A"}
`;

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="bg-gray-50 py-12 px-6 md:px-20">
      <div className="h-[50px]"></div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Book Appointment
        </h2>
        <div className="bg-red-500 h-[5px] w-[100px] mx-auto mt-0 mb-4 pt-0"></div>
        <p className="text-gray-600 mb-8 text-center">
          Schedule your consultation with our experienced doctors.
          Please fill out the form below and our team will contact you shortly.
        </p>

        {/* Appointment Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
            <User className="text-gray-500 w-5 h-5 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 text-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
            <Mail className="text-gray-500 w-5 h-5 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 text-gray-700"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
            <Phone className="text-gray-500 w-5 h-5 mr-3" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 text-gray-700"
              required
            />
          </div>

          {/* Date */}
          <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
            <Calendar className="text-gray-500 w-5 h-5 mr-3" />
            <input
              type="date"
              name="date"
              className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 text-gray-700"
              required
            />
          </div>

          {/* Department */}
          <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
            <Clipboard className="text-gray-500 w-5 h-5 mr-3" />
            <select
              name="department"
              className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 text-gray-700"
              required
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="General Medicine">General Medicine</option>
            </select>
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder="Message / Symptoms (Optional)"
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
            rows="4"
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookAppointment;
