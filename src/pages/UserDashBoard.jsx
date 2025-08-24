import React, { useEffect, useState } from "react";

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

import { useNavigate } from "react-router-dom";

const UserDashBoard = () => {
  const [appointments, setAppointments] = useState([]);
  const [apiStatus, setApiStatus] = useState("idle"); // idle | loading | success | error
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
  }, [filters, sort, page, limit]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="h-[100px]" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center flex-1">My Appointments</h2>
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={fetchUserAppointments}
        >
          Refresh
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2"
          placeholder="Filter by Date"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select
          name="serviceType"
          value={filters.serviceType}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2"
        >
          <option value="">All Designations</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="General Medicine">General Medicine</option>
        </select>
        <select
          value={sort}
          onChange={handleSortChange}
          className="border rounded px-3 py-2"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
        <select
          value={limit}
          onChange={handleLimitChange}
          className="border rounded px-3 py-2"
        >
          {[10, 20, 50, 100].map((n) => (
            <option key={n} value={n}>{n} per page</option>
          ))}
        </select>
      </div>
      {/* Toast for error */}
      {apiStatus === "error" && errorMsg && (
        <Toast message={errorMsg} onClose={() => setErrorMsg("")} />
      )}
      <div className="overflow-x-auto">
        {apiStatus === "loading" ? (
          <Spinner />
        ) : apiStatus === "error" ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-red-600 text-lg mb-4">Something went wrong. Please try again.</div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={fetchUserAppointments}
            >
              Refresh
            </button>
          </div>
        ) : (
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Designation</th>
                <th className="py-2 px-4">Message</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((a, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-4">{
                      a.appointmentDate
                        ? new Date(a.appointmentDate).toLocaleDateString("en-GB")
                        : ""
                    }</td>
                    <td className="py-2 px-4">{a.serviceType}</td>
                    <td className="py-2 px-4">{a.Message}</td>
                    <td className="py-2 px-4">{a.status || "Pending"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || apiStatus === "loading"}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages} ({total} results)</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || apiStatus === "loading"}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default UserDashBoard;
