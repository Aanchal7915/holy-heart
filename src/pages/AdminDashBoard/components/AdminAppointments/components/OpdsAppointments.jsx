import React, { useEffect, useState } from "react";
import Spinner from "../../../../../components/Spinner";
import { IoMdRefresh } from "react-icons/io";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";
const statusOptions = ["all", "confirmed", "pending", "cancelled", "reserved", "completed"];
const sortOptions = [
  { value: "desc", label: "Newest First" },
  { value: "asc", label: "Oldest First" }
];

const OpdsAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [sort, setSort] = useState("desc");
  const [services, setServices] = useState([]);
  const [showDetail, setShowDetail] = useState({});

  // Fetch available OPDS services for filter dropdown
  useEffect(() => {
    fetch(`${backendUrl}/services?type=opds`)
      .then(res => res.json())
      .then(data => setServices(data.services || []));
  }, []);

  const fetchAppointments = async () => {
    setApiStatus("loading");
    setErrorMsg("");
    try {
      const params = new URLSearchParams({
        limit,
        page,
        type: "opds",
        sort,
        ...(status !== "all" && { status }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(serviceId && { service: serviceId })
      });
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/appointments?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();
      setAppointments((data.appointments || []).filter(a => a.service?.type === "opds"));
      setTotalPages(data.totalPages || 1);
      setApiStatus("");
    } catch (err) {
      setApiStatus("error");
      setErrorMsg(err.message || "Error fetching appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [page, limit, status, startDate, endDate, serviceId, sort]);

  const clearFilters = () => {
    setStatus("all");
    setStartDate("");
    setEndDate("");
    setServiceId("");
    setSort("desc");
    setPage(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">OPDS Appointments</h3>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          onClick={fetchAppointments}
          title="Refresh"
        >
          <IoMdRefresh className="text-xl text-blue-900" />
        </button>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4 items-end">
        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500 mb-1">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
            ))}
          </select>
        </div>
        {/* <div className="flex flex-col">
          <label className="text-[10px] text-gray-500 mb-1">Service</label>
          <select
            value={serviceId}
            onChange={e => setServiceId(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All OPDS Services</option>
            {services.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div> */}
        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
            placeholder="Start Date"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
            placeholder="End Date"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500 mb-1">Sort</label>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button
          className="ml-2 px-3 py-1 rounded bg-gray-300 text-xs text-gray-700 hover:bg-gray-400"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
      {apiStatus === "loading" ? (
        <Spinner />
      ) : errorMsg ? (
        <div className="text-red-600">{errorMsg}</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Service</th>
              <th className="py-2 px-4">Doctor</th>
              <th className="py-2 px-4">Patient</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">No appointments found.</td>
              </tr>
            ) : (
              appointments.map(a => (
                <React.Fragment key={a._id}>
                  <tr>
                    <td className="py-2 px-4">{a.start ? new Date(a.start).toLocaleDateString() : "-"}</td>
                    <td className="py-2 px-4">{a.service?.name || "-"}</td>
                    <td className="py-2 px-4">{a.doctor?.name || "-"}</td>
                    <td className="py-2 px-4">{a.patientName || "-"}</td>
                    <td className="py-2 px-4">{a.status || "-"}</td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        onClick={() => setShowDetail(prev => ({ ...prev, [a._id]: !prev[a._id] }))}
                      >
                        {showDetail[a._id] ? "Hide" : "Show"} Details
                      </button>
                    </td>
                  </tr>
                  {showDetail[a._id] && (
                    <tr>
                      <td colSpan={6} className="bg-gray-50 px-4 py-3 border-t">
                        <div className="flex flex-col gap-2">
                          <div>
                            <span className="font-semibold">Doctor Details:</span>
                            <div className="ml-2 text-xs text-gray-700">
                              <div>Name: {a.doctor?.name || "-"}</div>
                              <div>Email: {a.doctor?.email || "-"}</div>
                              <div>Phone: {a.doctor?.phoneNu || "-"}</div>
                              <div>ID: {a.doctor?._id || "-"}</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold">Service Details:</span>
                            <div className="ml-2 text-xs text-gray-700">
                              <div>Name: {a.service?.name || "-"}</div>
                              <div>Description: {a.service?.description || "-"}</div>
                              <div>ID: {a.service?._id || "-"}</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold">Patient Details:</span>
                            <div className="ml-2 text-xs text-gray-700">
                              <div>Name: {a.patientName || "-"}</div>
                              <div>Email: {a.patientEmail || "-"}</div>
                              <div>Phone: {a.patientPhone || "-"}</div>
                              <div>User ID: {a.userId || "-"}</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold">Appointment Details:</span>
                            <div className="ml-2 text-xs text-gray-700">
                              <div>Start: {a.start ? `${a.start.split('T')[0]} ${a.start.split('T')[1].slice(0,5)}` : "-"}</div>
                              <div>End: {a.end ? `${a.end.split('T')[0]} ${a.end.split('T')[1].slice(0,5)}` : "-"}</div>
                              <div>Charge: {a.charge ? `₹${a.charge}` : "-"}</div>
                              <div>Status: {a.status || "-"}</div>
                              <div>Created At: {a.createdAt ? new Date(a.createdAt).toLocaleString() : "-"}</div>
                              <div>Updated At: {a.updatedAt ? new Date(a.updatedAt).toLocaleString() : "-"}</div>
                              <div>Appointment ID: {a._id}</div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      )}
      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          className="px-3 py-1 rounded border"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="px-3 py-1">{page} / {totalPages}</span>
        <button
          className="px-3 py-1 rounded border"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OpdsAppointments;