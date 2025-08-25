import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileTab from "../components/ProfileTab";
import ChatBot from "../components/ChatBot/ChatBot";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const Spinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

const Toast = ({ message, onClose }) => (
  <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-6 py-3 rounded shadow-lg flex items-center gap-4">
    <span>{message}</span>
    <button className="ml-4 px-2 py-1 bg-white text-red-600 rounded" onClick={onClose}>X</button>
  </div>
);

const UserAppointmentsTab = ({
  appointments, apiStatus, errorMsg, totalPages, page, total, limit, sort, filters,
  setPage, setLimit, setSort, setFilters, fetchUserAppointments
}) => (
  <div>
    <h3 className="text-xl font-bold mb-4">My Appointments</h3>
    
    {/* Filters */}
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={e => setFilters(prev => ({ ...prev, date: e.target.value }))}
        className="border px-3 py-2 rounded"
      />
      <select
        name="status"
        value={filters.status}
        onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
        className="border px-3 py-2 rounded"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
        <option value="completed">Completed</option>
      </select>
      <input
        type="text"
        name="serviceType"
        value={filters.serviceType}
        onChange={e => setFilters(prev => ({ ...prev, serviceType: e.target.value }))}
        placeholder="Service Type"
        className="border px-3 py-2 rounded"
      />
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
      <select
        value={limit}
        onChange={e => setLimit(Number(e.target.value))}
        className="border px-3 py-2 rounded"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={fetchUserAppointments}
      >
        Refresh
      </button>
    </div>
    {/* Table */}
    {apiStatus === "loading" ? (
      <Spinner />
    ) : errorMsg ? (
      <div className="text-red-600 mb-4">{errorMsg}</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Service</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Message</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((a) => (
                <tr key={a._id}>
                  <td className="px-4 py-2 border">
                    {a.appointmentDate
                      ? new Date(a.appointmentDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border">{a.serviceType}</td>
                  <td className="px-4 py-2 border capitalize">{a.status}</td>
                  <td className="px-4 py-2 border">{a.Message || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )}
    {/* Pagination */}
    <div className="flex justify-between items-center mt-4">
      <span>
        Page {page} of {totalPages} | Total: {total}
      </span>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          className="px-3 py-1 rounded bg-gray-200"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);

const UserDashBoard = () => {
  const [appointments, setAppointments] = useState([]);
  const [apiStatus, setApiStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("desc");
  const [filters, setFilters] = useState({
    date: "",
    status: "",
    serviceType: ""
  });
  const [activeTab, setActiveTab] = useState("appointments");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) navigate("/login");
    else if (role === "admin") navigate("/admin-dashboard");
  }, [navigate]);

  const fetchUserAppointments = () => {
    setApiStatus("loading");
    setErrorMsg("");
    const token = localStorage.getItem("token");
    const params = new URLSearchParams();
    if (filters.date) params.append("appointmentDate", filters.date);
    if (filters.status) params.append("status", filters.status);
    if (filters.serviceType) params.append("serviceType", filters.serviceType);
    params.append("sort", sort);
    params.append("page", page);
    params.append("limit", limit);
    fetch(`${backendUrl}/user/appointments?${params.toString()}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch appointments");
        return res.json();
      })
      .then((data) => {
        setAppointments(data.appointments || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
        setApiStatus("success");
      })
      .catch((err) => {
        setApiStatus("error");
        setErrorMsg(err.message || "Something went wrong. Please try again.");
      });
  };

  useEffect(() => {
    fetchUserAppointments();
    // eslint-disable-next-line
  }, [filters, sort, page, limit]);

  return (
    <section className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="h-[100px]" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center flex-1">User Dashboard</h2>
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
          className={`px-4 py-2 rounded font-semibold transition-all ${activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>
      <div className="w-full">
        {activeTab === "appointments" && (
          <UserAppointmentsTab
            appointments={appointments}
            apiStatus={apiStatus}
            errorMsg={errorMsg}
            totalPages={totalPages}
            page={page}
            total={total}
            limit={limit}
            sort={sort}
            filters={filters}
            setPage={setPage}
            setLimit={setLimit}
            setSort={setSort}
            setFilters={setFilters}
            fetchUserAppointments={fetchUserAppointments}
          />
        )}
        {activeTab === "profile" && <ProfileTab />}
      </div>
      {/* Floating ChatBot */}
      <ChatBot />
    </section>
  );
};

export default UserDashBoard;
