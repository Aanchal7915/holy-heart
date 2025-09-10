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

const PdfUpload = ({ appointmentId, pdfs = [], refresh }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("pdf", file);
      const res = await fetch(`${backendUrl}/doctors/appointments/${appointmentId}/upload-pdf`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to upload report");
      toast.success("Report uploaded successfully!");
      refresh();
    } catch (err) {
      toast.error(err.message || "Error uploading report");
    }
    setUploading(false);
  };

  const handleDelete = async (pdfUrl) => {
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors/appointments/${appointmentId}/delete-pdf`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pdfUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete report");
      toast.success("Report deleted successfully!");
      refresh();
    } catch (err) {
      toast.error(err.message || "Error deleting report");
    }
    setUploading(false);
  };

  return (
    <div className="ml-2 text-xs text-gray-700 flex flex-col gap-2">
      {pdfs && pdfs.length > 0 ? (
        pdfs.map((pdfUrl, idx) => (
          <div key={idx} className="flex flex-col gap-1 mb-2">
            <div className="flex items-center gap-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                Report {idx + 1}
              </a>
              <button
                className="text-red-600 text-xs px-2 py-1 border rounded hover:bg-red-50"
                disabled={uploading}
                onClick={() => handleDelete(pdfUrl)}
              >
                {uploading ? "Deleting..." : "Delete"}
              </button>
            </div>
            <div className="border rounded bg-gray-100 p-2">
              <iframe
                src={pdfUrl}
                title={`Report Preview ${idx + 1}`}
                width="100%"
                height="200px"
                style={{ border: "none" }}
              />
            </div>
          </div>
        ))
      ) : (
        <span className="text-gray-500">No reports uploaded.</span>
      )}
      <form
        className="flex items-center gap-2 mt-2"
        onSubmit={e => {
          e.preventDefault();
          const file = e.target.elements.pdf.files[0];
          handleUpload({ target: { files: [file] } });
          e.target.reset();
        }}
      >
        <input
          type="file"
          name="pdf"
          accept="application/pdf"
          className="text-xs"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-2 py-1 rounded text-xs"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Report"}
        </button>
      </form>
    </div>
  );
};

const ServiceAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showDetail, setShowDetail] = useState({});

  // Filters
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [sort, setSort] = useState("desc");
  const [services, setServices] = useState([]);

  // Fetch available services for filter dropdown
  useEffect(() => {
    fetch(`${backendUrl}/services?type=treatment`)
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
        type: "treatment",
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
      setAppointments((data.appointments || []).filter(a => a.service?.type === "treatment"));
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
        <h3 className="font-semibold">Service/Treatment Appointments</h3>
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
        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500 mb-1">Service</label>
          <select
            value={serviceId}
            onChange={e => setServiceId(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All Services</option>
            {services.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>
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
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">No appointments found.</td>
              </tr>
            ) : (
              appointments.map(a => (
                <React.Fragment key={a._id}>
                  <tr>
                    <td className="py-2 px-4">{a.start ? new Date(a.start).toLocaleDateString() : "-"}</td>
                    <td className="py-2 px-4">{a.service?.name || "-"}</td>
                    <td className="py-2 px-4">{a.doctor?.name || "-"}</td>
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
                      <td colSpan={5} className="bg-gray-50 px-4 py-3 border-t">
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
                              <div>Start: {a.start? `${a.start.split("T")[0]} ${a.start.split("T")[1].slice(0,5)}`: "-"}</div>
                              <div>End: {a.end ? `${a.end.split("T")[0]} ${a.end.split("T")[1].slice(0,5)}`: "-"}</div>
                              <div>Charge: {a.charge ? `₹${a.charge}` : "-"}</div>
                              <div>Status: {a.status || "-"}</div>
                              <div>Created At: {a.createdAt ? new Date(a.createdAt).toLocaleString() : "-"}</div>
                              <div>Updated At: {a.updatedAt ? new Date(a.updatedAt).toLocaleString() : "-"}</div>
                              <div>Appointment ID: {a._id}</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold">PDF Report(s):</span>
                            <PdfUpload
                              appointmentId={a._id}
                              pdfs={a.images || []}
                              refresh={fetchAppointments}
                            />
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

export default ServiceAppointments;