import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileTab from "../../components/ProfileTab";
import ChatBot from "./ChatBot/ChatBot";
import { IoMdRefresh } from "react-icons/io";

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

const SERVICES = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "General Medicine"
  // Add more if needed
];

const UserAppointmentsTab = ({
  appointments, apiStatus, errorMsg, totalPages, page, total, limit, sort, filters,
  setPage, setLimit, setSort, setFilters, fetchUserAppointments
}) => (
  <div className="text-xs sm:text-sm md:text-base">
    <div className="flex flex-row items-center mb-4 md:mb-6 gap-2">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">My Appointments</h3>
      <button
        className="px-3 pt-1 bg-inherit rounded"
        onClick={fetchUserAppointments}
      >
        <IoMdRefresh className="text-blue-900 text-xl" />
      </button>
    </div>
    {/* Filters */}
    <div className="flex flex-wrap gap-4 mb-4 items-end text-xs sm:text-sm md:text-base">
      {/* Service Type Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="serviceType" className="text-xs text-gray-600 mb-1">Service</label>
        <select
          id="serviceType"
          name="serviceType"
          value={filters.serviceType}
          onChange={e => setFilters(prev => ({ ...prev, serviceType: e.target.value }))}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Services</option>
          {SERVICES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="status" className="text-xs text-gray-600 mb-1">Status</label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
          {/* <option value="Completed">Completed</option> */}
        </select>
      </div>
      {/* Start Date Picker */}
      <div className="flex flex-col">
        <label htmlFor="startDate" className="text-xs text-gray-600 mb-1">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={filters.startDate}
          onChange={e => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
          className="border px-3 py-2 rounded"
          placeholder="Start Date"
          title="Start Date"
        />
      </div>
      {/* End Date Picker */}
      <div className="flex flex-col">
        <label htmlFor="endDate" className="text-xs text-gray-600 mb-1">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={filters.endDate}
          onChange={e => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
          className="border px-3 py-2 rounded"
          placeholder="End Date"
          title="End Date"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="sort" className="text-xs text-gray-600 mb-1">Sort</label>
        <select
          id="sort"
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="limit" className="text-xs text-gray-600 mb-1">Per Page</label>
        <select
          id="limit"
          value={limit}
          onChange={e => setLimit(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <button
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded h-10 mt-5"
        onClick={() => {
          setFilters({
            serviceType: "",
            status: "",
            startDate: "",
            endDate: ""
          });
          setSort("desc");
          setLimit(10);
          setPage(1);
        }}
        title="Clear all filters"
      >
        Clear Filters
      </button>
    </div>
    {/* Table */}
    {apiStatus === "loading" ? (
      <Spinner />
    ) : errorMsg ? (
      <div className="flex flex-col items-center justify-center py-8 md:py-16">
        <div className="text-red-600 text-xs sm:text-sm md:text-lg mb-4">{errorMsg}. Something went wrong. Please try again.</div>
        <button
          className="px-3 md:px-4 py-2 bg-blue-900 text-white rounded transition text-xs sm:text-sm"
          onClick={fetchUserAppointments}
        >
          Refresh
        </button>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full border text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Service</th>
              <th className="px-4 py-2 border">Doctor</th>
              <th className="px-4 py-2 border">Start</th>
              <th className="px-4 py-2 border">End</th>
              <th className="px-4 py-2 border">Charge</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((a) => (
                <tr key={a._id}>
                  <td className="px-4 py-2 border">
                    {a.start ? new Date(a.start).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {a.service?.name || "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {a.doctor?.name || "-"}
                    {/* <br />
                    <span className="text-gray-500">{a.doctor?.email}</span> */}
                  </td>
                  <td className="px-4 py-2 border">
                    {a.start ? new Date(a.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {a.end ? new Date(a.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {a.charge ? `₹${a.charge}` : "-"}
                  </td>
                  <td className="px-4 py-2 border capitalize">{a.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )}
    {/* Pagination */}
    <div className="flex justify-between items-center mt-4 text-xs sm:text-sm md:text-base">
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
    serviceType: "",
    status: "",
    appointmentDate: "",
    startDate: "",
    endDate: ""
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
    if (filters.serviceType) params.append("serviceType", filters.serviceType);
    if (filters.status) params.append("status", filters.status);
    if (filters.appointmentDate) params.append("appointmentDate", filters.appointmentDate);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    params.append("sort", sort);
    params.append("page", page);
    params.append("limit", limit);
    console.log("Fetching with params:", params.toString());
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
    <section className="p-2 md:p-8 bg-gray-50 min-h-screen">
      <div className="h-[100px]" />
      <div className="flex-col justify-center items-center mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-center flex-1">User Dashboard</h2>
        <div className="bg-red-500 h-[5px] w-[120px] mx-auto mt-2 mb-6 pt-0"></div>
      </div>
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button
          className={`text-sm md:text-base px-4 py-2 rounded font-semibold transition-all ${activeTab === "appointments" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={`text-sm md:text-base px-4 py-2 rounded font-semibold transition-all ${activeTab === "profile" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
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
      {/* <ChatBot /> */}
    </section>
  );
};

export default UserDashBoard;
