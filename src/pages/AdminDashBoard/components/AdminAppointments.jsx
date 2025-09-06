import React, { useState, useEffect } from "react";
import Spinner from "../../../components/Spinner";
import { IoMdRefresh } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", status: "", designation: "" });
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
  const [modalApiStatus, setModalApiStatus] = useState(""); // Separate API status for modal

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [filters, sort, limit, page]);

  const fetchAppointments = async () => {
    setApiStatus("loading");
    setErrorMsg("");
    try {
      const params = new URLSearchParams({
        status: filters.status,
        designation: filters.designation,
        startDate: filters.startDate,
        endDate: filters.endDate,
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

  const clearFilters = () => {
    setFilters({ startDate: "", endDate: "", status: "", designation: "" });
    setSort("desc");
    setLimit(10);
    setPage(1);
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status || "Pending");
    setShowModal(true);
    setModalApiStatus(""); // Reset modal API status
  };
  const closeModal = () => setShowModal(false);

  const handleUpdateStatus = async () => {
    if (!selectedAppointment) return;
    setModalApiStatus("loading");
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
      setModalApiStatus("");
      toast.success("Appointment status updated successfully!");
    } catch (err) {
      setModalApiStatus("error");
      toast.error(err.message || "Error updating status");
    }
  };

  return (
    <section className="p-2 md:p-8 bg-gray-50 min-h-screen text-xs sm:text-sm md:text-base">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="mb-6 flex flex-row flex-wrap items-center">
        <h2 className="text-xl sm:text-2xl font-bold">Appointments</h2>
        <button
          className="px-3 pt-1 bg-inherit rounded"
          onClick={fetchAppointments}
        >
          <IoMdRefresh className="text-blue-900 text-xl" />
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 items-end text-xs sm:text-sm md:text-base">
        {/* Status */}
        <div className="flex flex-col">
          <label htmlFor="status" className="text-xs text-gray-600 mb-1">Status</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 text-xs md:text-base"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        {/* Designation */}
        <div className="flex flex-col">
          <label htmlFor="designation" className="text-xs text-gray-600 mb-1">Service Type</label>
          <select
            id="designation"
            name="designation"
            value={filters.designation}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 text-xs md:text-base"
          >
            <option value="">All Service</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="General Medicine">General Medicine</option>
          </select>
        </div>
        {/* Start Date */}
        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-xs text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded"
            placeholder="Start Date"
            title="Start Date"
          />
        </div>
        {/* End Date */}
        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-xs text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded"
            placeholder="End Date"
            title="End Date"
          />
        </div>
        {/* Sort */}
        <div className="flex flex-col">
          <label htmlFor="sort" className="text-xs text-gray-600 mb-1">Sort</label>
          <select
            id="sort"
            value={sort}
            onChange={handleSortChange}
            className="border rounded px-3 py-2 text-xs md:text-base"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
        {/* Limit */}
        <div className="flex flex-col">
          <label htmlFor="limit" className="text-xs text-gray-600 mb-1">Per Page</label>
          <select
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            className="border rounded px-3 py-2 text-xs md:text-base"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>{n} per page</option>
            ))}
          </select>
        </div>
        {/* Clear Filters Button */}
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded h-10 mt-5"
          onClick={clearFilters}
          title="Clear all filters"
        >
          Clear Filters
        </button>
      </div>

      <div className="overflow-x-auto">
        {apiStatus === "loading" ? (
          <div className="text-center py-8"><Spinner /></div>
        ) : apiStatus === "error" ? (
          <div className="flex flex-col items-center justify-center py-8 md:py-16">
            <div className="text-red-600 text-xs sm:text-sm md:text-lg mb-4">Something went wrong. Please try again.</div>
            <button
              className="px-3 md:px-4 py-2 bg-blue-900 text-white rounded  transition text-xs sm:text-sm"
              onClick={fetchAppointments}
            >
              Refresh
            </button>
          </div>
        ) : (
          <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-2 md:px-4">Patient Name</th>
                <th className="py-2 px-2 md:px-4">Patient Email</th>
                <th className="py-2 px-2 md:px-4">Patient Phone</th>
                <th className="py-2 px-2 md:px-4">Doctor</th>
                <th className="py-2 px-2 md:px-4">Service</th>
                <th className="py-2 px-2 md:px-4">Start</th>
                <th className="py-2 px-2 md:px-4">End</th>
                <th className="py-2 px-2 md:px-4">Charge</th>
                <th className="py-2 px-2 md:px-4">Status</th>
                <th className="py-2 px-2 md:px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-6 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((a, idx) => (
                  <tr key={a._id || idx} className="border-b">
                    <td className="py-2 px-2 md:px-4">{a.patientName}</td>
                    <td className="py-2 px-2 md:px-4">{a.patientEmail}</td>
                    <td className="py-2 px-2 md:px-4">{a.patientPhone}</td>
                    <td className="py-2 px-2 md:px-4">
                      {a.doctor?.name || "-"}
                      {/* <br /> */}
                      {/* <span className="text-gray-500">{a.doctor?.email}</span> */}
                      {/* <br /> */}
                      {/* <span className="text-gray-500">{a.doctor?.phoneNu}</span> */}
                    </td>
                    <td className="py-2 px-2 md:px-4">
                      {a.service?.name || "-"}
                      {/* <br /> */}
                      {/* <span className="text-gray-500">{a.service?.description}</span> */}
                    </td>
                    <td className="py-2 px-2 md:px-4">
                      {a.start ? new Date(a.start).toLocaleString("en-GB") : ""}
                    </td>
                    <td className="py-2 px-2 md:px-4">
                      {a.end ? new Date(a.end).toLocaleString("en-GB") : ""}
                    </td>
                    <td className="py-2 px-2 md:px-4">{a.charge ? `₹${a.charge}` : "-"}</td>
                    <td className="py-2 px-2 md:px-4">{a.status || "Pending"}</td>
                    <td className="py-2 px-2 md:px-4">
                      {/* {(!a.status || a.status.toLowerCase() === "pending" || a.status.toLowerCase() === "reserved") && (
                        <button
                          className="bg-green-800 hover:bg-green-900 text-white px-2 md:px-3 py-1 rounded text-xs"
                          onClick={() => openModal(a)}
                          disabled={apiStatus === "loading"}
                        >
                          Update Status
                        </button>
                      )} */}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-90">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full max-w-xs md:max-w-md mx-2 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={closeModal}
            >
              <IoMdCloseCircleOutline className="text-3xl" />
            </button>
            <h3 className="text-lg md:text-xl font-bold text-center">Update Appointment Status</h3>
            <div className="bg-red-500 h-[4px] w-[80px] md:w-[80px] mx-auto mt-1 mb-4 md:mb-6 pt-0"></div>

            <div className="space-y-2 mb-4 text-xs md:text-base">
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
                disabled={modalApiStatus === "loading"}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2 rounded font-semibold transition"
              onClick={handleUpdateStatus}
              disabled={modalApiStatus === "loading"}
            >
              {modalApiStatus === "loading" ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-xs sm:text-sm md:text-base">
        <span>Page {page} of {totalPages} ({total} results)</span>
        <div className="flex gap-2">
          <button
            className="px-3 md:px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || apiStatus === "loading"}
          >
            Previous
          </button>

          <button
            className="px-3 md:px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || apiStatus === "loading"}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminAppointments;
