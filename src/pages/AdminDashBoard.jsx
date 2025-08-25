import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAppointments from "../components/admin/AdminAppointments";
import AdminAnalytics from "../components/admin/AdminAnalytics";
import AdminUsersTab from "../components/AdminUsersTab"; // <-- Import the Users tab component
import ProfileTab from "../components/ProfileTab";

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
    <section className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="h-[100px]" />
      <div className="flex-col justify-center items-center mb-6">
        <h2 className="text-3xl font-bold text-center flex-1">Admin Dashboard</h2>
        <div className="bg-red-500 h-[5px] w-[120px] mx-auto mt-2 mb-6 pt-0"></div>
      </div>
      {/* Tab Switcher */}
      <div className="flex gap-4 mb-8 justify-center">
        <button
          className={`px-4 py-2 rounded font-semibold transition-all ${activeTab === "appointments" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-all ${activeTab === "analytics" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-all ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-all ${activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>
      <div className="w-full">
        {activeTab === "appointments" && <AdminAppointments />}
        {activeTab === "analytics" && <AdminAnalytics />}
        {activeTab === "users" && <AdminUsersTab />}
        {activeTab === "profile" && <ProfileTab />}
      </div>
    </section>
  );
};

export default AdminDashBoard;
