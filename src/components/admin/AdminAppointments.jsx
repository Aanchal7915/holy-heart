
import React, { useState, useEffect } from "react";

// Toast and Spinner components should be imported if used
// import Toast from "../Toast";
// import Spinner from "../Spinner";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filters, setFilters] = useState({ date: "", status: "", designation: "" });
  const [sort, setSort] = useState("desc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [apiStatus, setApiStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [filters, sort, limit, page]);

  const fetchAppointments = async () => {
    setApiStatus("loading");
    setErrorMsg("");
    try {
      // Replace with your actual API endpoint
      const params = new URLSearchParams({
        date: filters.date,
        status: filters.status,
        designation: filters.designation,
        sort,
        limit,
        page,
      });
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/appointments?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();
      setAppointments(data.appointments || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setApiStatus("");
    } catch (err) {
      setApiStatus("error");
      setErrorMsg(err.message || "Error fetching appointments");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };
  const handleSortChange = (e) => setSort(e.target.value);
  const handleLimitChange = (e) => setLimit(Number(e.target.value));

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status || "Pending");
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleUpdateStatus = async () => {
    if (!selectedAppointment) return;
    setApiStatus("loading");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/appointments/${selectedAppointment._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      closeModal();
      fetchAppointments();
    } catch (err) {
      setApiStatus("error");
      setErrorMsg(err.message || "Error updating status");
    }
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center flex-1">Appointments</h2>
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={fetchAppointments}
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
          name="designation"
          value={filters.designation}
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
        // <Toast message={errorMsg} onClose={() => setErrorMsg("")} />
        <div className="text-red-600 text-lg mb-4">{errorMsg}</div>
      )}

      <div className="overflow-x-auto">
        {apiStatus === "loading" ? (
          // <Spinner />
          <div className="text-center py-8">Loading...</div>
        ) : apiStatus === "error" ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-red-600 text-lg mb-4">Something went wrong. Please try again.</div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={fetchAppointments}
            >
              Refresh
            </button>
          </div>
        ) : (
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Designation</th>
                <th className="py-2 px-4">Message</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((a, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-4">{a.patientName}</td>
                    <td className="py-2 px-4">{a.patientEmail}</td>
                    <td className="py-2 px-4">{a.patientPhone}</td>
                    <td className="py-2 px-4">{
                      a.appointmentDate
                        ? new Date(a.appointmentDate).toLocaleDateString("en-GB")
                        : ""
                    }</td>
                    <td className="py-2 px-4">{a.serviceType}</td>
                    <td className="py-2 px-4">{a.Message}</td>
                    <td className="py-2 px-4">{a.status || "Pending"}</td>
                    <td className="py-2 px-4">
                      {(!a.status || a.status.toLowerCase() === "pending") && (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                          onClick={() => openModal(a)}
                          disabled={apiStatus === "loading"}
                        >
                          Update Status
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal for update status */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">Update Appointment Status</h3>
            <div className="space-y-2 mb-4">
              <div><b>Name:</b> {selectedAppointment.patientName}</div>
              <div><b>Email:</b> {selectedAppointment.patientEmail}</div>
              <div><b>Phone:</b> {selectedAppointment.patientPhone}</div>
              <div><b>Date:</b> {selectedAppointment.appointmentDate ? new Date(selectedAppointment.appointmentDate).toLocaleDateString("en-GB") : ""}</div>
              <div><b>Designation:</b> {selectedAppointment.serviceType}</div>
              <div><b>Message:</b> {selectedAppointment.Message}</div>
              <div><b>Current Status:</b> {selectedAppointment.status || "Pending"}</div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Select New Status</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={newStatus}
                onChange={e => setNewStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
              onClick={handleUpdateStatus}
              disabled={apiStatus === "loading"}
            >
              Update
            </button>
          </div>
        </div>
      )}
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

export default AdminAppointments;
