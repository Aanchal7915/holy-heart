import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAppointments from "./components/AdminAppointments";
import AdminAnalytics from "./components/AdminAnalytics";
import AdminUsersTab from "./components/AdminUsersTab";
import ProfileTab from "../../components/ProfileTab";
import ServiceTab from "./components/ServiceTab";
import DoctorTab from "./components/DoctorTab";

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) navigate("/login");
    else if (role !== "admin") navigate("/user-dashboard");
  }, [navigate]);

  return (
    <section className="p-2 md:p-8 bg-gray-50 min-h-screen">
      <div className="h-8 h-[100px]" />
      <div className="flex flex-col justify-center items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-center flex-1">Admin Dashboard</h2>
        <div className="bg-red-500 h-[5px] w-[80px] md:w-[120px] mx-auto mt-2 mb-4 md:mb-6 pt-0"></div>
      </div>
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8 justify-center">
        <button
          className={`px-3 md:px-4 py-2 rounded font-semibold transition-all text-sm md:text-base ${activeTab === "appointments" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={`px-3 md:px-4 py-2 rounded font-semibold transition-all text-sm md:text-base ${activeTab === "analytics" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
        <button
          className={`px-3 md:px-4 py-2 rounded font-semibold transition-all text-sm md:text-base ${activeTab === "users" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`px-3 md:px-4 py-2 rounded font-semibold transition-all text-sm md:text-base ${activeTab === "profile" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`px-3 md:px-4 py-2 rounded font-semibold transition-all text-sm md:text-base ${activeTab === "services" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
        <button
          className={`px-3 md:px-4 py-2 rounded font-semibold transition-all text-sm md:text-base ${activeTab === "doctors" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors
        </button>
      </div>
      <div className="w-full max-w-full md:max-w-5xl mx-auto">
        {activeTab === "appointments" && <AdminAppointments />}
        {activeTab === "analytics" && <AdminAnalytics />}
        {activeTab === "users" && <AdminUsersTab />}
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "services" && <ServiceTab />}
        {activeTab === "doctors" && <DoctorTab />}
      </div>
    </section>
  );
};

export default AdminDashBoard;
