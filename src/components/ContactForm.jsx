import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

export default function ContactFormSection() {
  return (
    <section className="py-16 px-6">
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Left Form */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-300">
          <h2 className="text-2xl font-bold mb-2">Send Us A Message</h2>
          <div className="bg-red-500 h-[5px] w-[100px] mt-0 mb-4 pt-0"></div>
          <p className="text-gray-600 mb-6">
            Fill out the form below and our team will get back to you within 24 hours.
            For urgent matters, please call our emergency helpline.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                required
                className="border p-3 border border-gray-300 outline-none focus:outline-none focus:ring-0 p-3 rounded-lg w-full"
              />
              <input
                type="email"
                placeholder="Email Address *"
                required
                className="border p-3 border border-gray-300 outline-none focus:outline-none focus:ring-0 p-3 rounded-lg w-full"
              />
            </div>

            <input
              type="tel"
              placeholder="Phone Number *"
              required
              className="border p-3 border border-gray-300 outline-none focus:outline-none focus:ring-0 p-3 rounded-lg w-full"
            />

            <select className="border p-3 border border-gray-300 outline-none focus:outline-none focus:ring-0 p-3 rounded-lg w-full">
              <option>Select Subject</option>
              <option>General Inquiry</option>
              <option>Appointments</option>
              <option>Emergency</option>
            </select>

            <textarea
              placeholder="Message *"
              rows="4"
              required
              className="border p-3 border border-gray-300 outline-none focus:outline-none focus:ring-0 p-3 rounded-lg w-full"
            ></textarea>

            {/* Contact Method */}
            {/* Removed contact method radio buttons as requested */}

            <button
              type="button"
              className="flex- flex-row items-center gap-x-2 w-full bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              onClick={() => window.open('https://wa.me/911262279279', '_blank')}
            >
              <FaEnvelope /> Send Message
            </button>
          </form>
        </div>

        {/* Right Info */}
        <div className="space-y-6 self-center">


          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-300">
            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
            <div className="bg-red-500 h-[5px] w-[100px]  mt-0 mb-4 pt-0"></div>
            <p className="text-gray-600 mb-6">
              Get in touch with Holy Heart Hospital for comprehensive cardiac care.
              We're committed to providing exceptional healthcare services.
            </p>

            <ul className="space-y-4 text-gray-700">

              <li className="flex items-center gap-3">
                <span className="bg-blue-100 p-3 rounded-full ">
                  <FaMapMarkerAlt className="text-blue-600" size={26} />
                </span>
                <span>
                  Holy Heart Advanced Cardiac Care & Research Center <br />
                  330, Vinay Nagar, Delhi Bypass Chowk,<br />
                  Rohtak - 124001, Haryana (India)
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="bg-red-100 p-3 rounded-full ">
                  <FaPhoneAlt className="text-red-600" size={26} />
                </span>
                <span>
                  <a href="tel:01262279279" className="hover:underline text-red-700">01262-279279</a>, <a href="tel:01262262292" className="hover:underline text-red-700">01262-262292</a>
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="bg-green-100 p-3 rounded-full ">
                  <FaEnvelope className="text-green-600" size={26} />
                </span>
                <span>
                  holyheartk@gmail.com <br />
                  General inquiries and appointments
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="bg-purple-100 p-3 rounded-full">
                  <FaClock className="text-purple-600" size={26}/>
                  </span>
                <span>
                  Mon - Sat: 9:00 AM - 8:00 PM <br />
                  24/7 Emergency Services Available
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          {/* <div className="bg-red-600 text-white p-6 rounded-2xl shadow-2xl">
            <h3 className="font-bold text-lg mb-3">Connect With Us</h3>
            <p className="text-sm mb-4">
              Follow us on social media for health tips, hospital updates, and
              cardiac care information.
            </p>
            <div className="flex gap-4 text-xl">
              <a href="https://www.facebook.com/Holyheartrohtak/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200" aria-label="Facebook"><span role="img" aria-label="Facebook">�</span></a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
