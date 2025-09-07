import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Calendar, Clipboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SpinnerInBtn = () => (
  <svg
    className="animate-spin h-5 w-5 text-white inline-block mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8z"
    ></path>
  </svg>
);

const BookAppointment = () => {
  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState("idle");
  const [services, setServices] = useState([]);
  const [serviceType, setServiceType] = useState("treatment"); // "treatment" or "test"
  const navigate = useNavigate();

  // Fetch services for dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000"}/services`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        const data = await response.json();
        setServices(data.services || []);
      } catch {
        setServices([]);
      }
    };
    fetchServices();
  }, []);

  // Protect route: redirect to login if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setApiStatus("loading");
    const formData = new FormData(e.target);
    const date = formData.get("date");
    const department = formData.get("department");
    const message = formData.get("message");

    // Format date as DD-MM-YYYY
    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-")
      : "";

    const payload = {
      appointmentDate: formattedDate,
      Message: message || "N/A",
      serviceId: department,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND ||
          import.meta.env.backend ||
          "http://localhost:8000"}/appointments/auto-book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        toast.success("Appointment booked successfully!");
        e.target.reset();
        setTimeout(() => {
          const role = localStorage.getItem("role");
          if (role === "admin") navigate("/admin-dashboard");
          else navigate("/user-dashboard");
        }, 1500);
      } else {
        const data = await response.json();
        setError(
          data?.error || data?.message || data?.reason || "Failed to book appointment. Please try again."
        );
        setTimeout(() => setError(""), 8000);
      }
    } catch (error) {
      setError("Error booking appointment. Please check your connection.");
      setTimeout(() => setError(""), 3000);
    }
    setApiStatus("idle");
  };

  // Filter services based on selected type
  const filteredServices = services.filter(
    (s) => s.status === "active" && s.type === serviceType
  );

  return (
    <motion.section
      className="bg-gray-50 py-12 px-6 md:px-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <ToastContainer position="top-right" autoClose={2000} />
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

        {/* Service Type Switch */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            className={`px-4 py-2 rounded font-semibold transition-all ${
              serviceType === "treatment"
                ? "bg-blue-900 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setServiceType("treatment")}
          >
            Treatment
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded font-semibold transition-all ${
              serviceType === "test"
                ? "bg-blue-900 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setServiceType("test")}
          >
            Test
          </button>
        </div>

        {/* Appointment Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Date */}
          <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
            <Calendar className="text-gray-500 w-5 h-5 mr-3" />
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 text-gray-700"
              required
            />
          </div>

          {/* Department (Service) */}
          <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
            <Clipboard className="text-gray-500 w-5 h-5 mr-3" />
            <select
              name="department"
              className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 text-gray-700"
              required
            >
              <option value="">
                {serviceType === "treatment" ? "Select Treatment" : "Select Test"}
              </option>
              {filteredServices.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                  {serviceType === "test" && s.price ? ` (₹${s.price})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder="Message / Symptoms (Optional)"
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
            rows="4"
          ></textarea>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center"
            disabled={apiStatus === "loading"}
          >
            {apiStatus === "loading" && <SpinnerInBtn />}
            Book Appointment
          </button>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 mt-2 text-center">{error}</div>
          )}
        </form>
      </div>
    </motion.section>
  );
};

export default BookAppointment;
