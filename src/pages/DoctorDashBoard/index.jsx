import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoMdRefresh } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { MdPictureAsPdf } from "react-icons/md";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ProfileTab from "./components/ProfileTab";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

// PDF Upload & Delete Button (for multiple PDFs)
const PdfUpload = ({ itemId, type, pdfs = [], refresh }) => {
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
      formData.append("pdfs", file);
      const res = await fetch(`${backendUrl}/doctors/appointments/${itemId}/upload-pdf`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload PDF");
      toast.success("PDF uploaded!");
      refresh();
    } catch (err) {
      toast.error(err.message || "Upload failed");
    }
    setUploading(false);
  };

  const handleDelete = async (pdfUrl) => {
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors/appointments/${itemId}/delete-pdf`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdfUrl }),
      });
      if (!res.ok) throw new Error("Failed to delete PDF");
      toast.success("PDF deleted!");
      refresh();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {pdfs && pdfs.length > 0 ? (
          pdfs.map((pdfUrl, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
              {/* PDF Preview */}
              <iframe
                src={pdfUrl}
                title={`PDF Preview ${idx + 1}`}
                width={60}
                height={60}
                className="border rounded bg-white"
                style={{ minWidth: 60, minHeight: 60 }}
              />
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline text-xs flex items-center gap-1"
                title={`PDF ${idx + 1}`}
              >
                <MdPictureAsPdf className="text-red-600" />
                PDF {idx + 1}
              </a>
              <button
                className="ml-1 text-red-600 hover:text-red-800"
                title="Delete PDF"
                onClick={() => handleDelete(pdfUrl)}
                disabled={uploading}
              >
                <FiTrash2 />
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-400 text-xs">No PDF uploaded</span>
        )}
      </div>
      <label className="bg-blue-600 text-white px-2 py-1 rounded text-xs cursor-pointer mt-1 w-fit">
        {uploading ? "Uploading..." : "Upload PDF"}
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

// Toggleable row for details
const ToggleDetailRow = ({ record, type, refresh }) => {
  const [showDetail, setShowDetail] = useState(false);

  // Use images array for PDFs
  const pdfs = record.images || [];

  return (
    <>
      <tr>
        <td className="py-2 px-4">{record.patient?.name || "-"}</td>
        <td className="py-2 px-4">{type === "test" ? record.testName || "-" : record.service?.name || "-"}</td>
        <td className="py-2 px-4">{record.start ? new Date(record.start).toLocaleDateString() : record.date ? new Date(record.date).toLocaleDateString() : "-"}</td>
        <td className="py-2 px-4">{record.start ? new Date(record.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : record.date ? new Date(record.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-"}</td>
        <td className="py-2 px-4">{record.status || "-"}</td>
        <td className="py-2 px-4">
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
            onClick={() => setShowDetail((v) => !v)}
          >
            {showDetail ? "Hide Details" : "Show Details"}
          </button>
        </td>
      </tr>
      {showDetail && (
        <tr>
          <td colSpan={6} className="bg-gray-50 px-4 py-3 border-t">
            <div className="flex flex-col gap-2">
              <div>
                <span className="font-semibold">Patient Details:</span>
                <div className="ml-2 text-xs text-gray-700">
                  <div>Name: {record.patient?.name || "-"}</div>
                  <div>Gender: {record.patient?.gender || "-"}</div>
                  <div>Email: {record.patient?.email || "-"}</div>
                  <div>Phone: {record.patient?.phoneNu || "-"}</div>
                </div>
              </div>
              <div>
                <span className="font-semibold">PDF Report(s):</span>
                <PdfUpload
                  itemId={record._id}
                  type={type}
                  pdfs={pdfs}
                  refresh={refresh}
                />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// Appointment Tab Component
const DoctorAppointmentsTab = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch {
      setAppointments([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Appointments</h3>
        <button className="bg-gray-200 rounded-full p-2" onClick={fetchAppointments}>
          <IoMdRefresh className="text-xl text-blue-900" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Patient</th>
              <th className="py-2 px-4">Service</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">No appointments found.</td>
              </tr>
            ) : (
              appointments.map((a) => (
                <ToggleDetailRow key={a._id} record={a} type="appointments" refresh={fetchAppointments} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Test Tab Component
const DoctorTestsTab = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors/test-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTests(data.testBookings || []);
    } catch {
      setTests([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Tests</h3>
        <button className="bg-gray-200 rounded-full p-2" onClick={fetchTests}>
          <IoMdRefresh className="text-xl text-blue-900" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Patient</th>
              <th className="py-2 px-4">Test Name</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {tests.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">No tests found.</td>
              </tr>
            ) : (
              tests.map((t) => (
                <ToggleDetailRow key={t._id} record={t} type="tests" refresh={fetchTests} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// OPDS Tab Component
const DoctorOpdsTab = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOpds = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/opds/doctors/opds-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch {
      setAppointments([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOpds();
  }, []);

  // Prepare events for react-big-calendar
  const localizer = momentLocalizer(moment);
  const calendarEvents = appointments.map(a => ({
    id: a._id,
    title: `${a.patient?.name || "Patient"} (${a.status})`,
    start: new Date(a.start),
    end: new Date(a.end),
    allDay: false,
    resource: a,
  }));

  // Custom tooltip on hover
  const EventTooltip = ({ event }) => (
    <div className="p-2 text-xs">
      <div><b>Patient:</b> {event.resource.patient?.name}</div>
      <div><b>Email:</b> {event.resource.patient?.email}</div>
      <div><b>Phone:</b> {event.resource.patient?.phoneNu}</div>
      <div><b>Status:</b> {event.resource.status}</div>
      <div><b>Time:</b> {moment(event.resource.start).format("HH:mm")} - {moment(event.resource.end).format("HH:mm")}</div>
    </div>
  );

  // Custom event wrapper for tooltip
  const CustomEvent = ({ event }) => {
    const [show, setShow] = useState(false);
    return (
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{ position: "relative" }}
      >
        <span>{event.title}</span>
        {show && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 10,
              background: "#fff",
              border: "1px solid #ddd",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "6px",
              minWidth: "180px",
              fontSize: "0.85rem"
            }}
          >
            <EventTooltip event={event} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">OPDS Bookings</h3>
        <button className="bg-gray-200 rounded-full p-2" onClick={fetchOpds}>
          <IoMdRefresh className="text-xl text-blue-900" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Patient Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">No OPDS bookings found.</td>
              </tr>
            ) : (
              appointments.map((a) => (
                <tr key={a._id}>
                  <td className="py-2 px-4">{a.patient?.name || "-"}</td>
                  <td className="py-2 px-4">{a.patient?.email || "-"}</td>
                  <td className="py-2 px-4">{a.patient?.phoneNu || "-"}</td>
                  <td className="py-2 px-4">{a.start ? new Date(a.start).toLocaleDateString() : "-"}</td>
                  <td className="py-2 px-4">
                    {a.start && a.end
                      ? `${a.start.split('T')[0]} ${a.start.split('T')[1].slice(0,5)} - ${a.end.split('T')[0]} ${a.start.split('T')[1].slice(0,5)}`
                      : "-"}
                  </td>
                  <td className="py-2 px-4">{a.status || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Calendar below the table */}
      <div className="mt-8 bg-white rounded shadow p-4">
        <h4 className="font-semibold mb-2">OPDS Calendar View</h4>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
          components={{
            event: CustomEvent
          }}
        />
      </div>
    </div>
  );
};

// Main Doctor Dashboard
export default function DoctorDashBoard ()  {
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <section className="p-2 md:p-8 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="h-[80px]" />
      <div className="flex-col justify-center items-center mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-center flex-1">Doctor Dashboard</h2>
        <div className="bg-blue-900 h-[5px] w-[120px] mx-auto mt-2 mb-6 pt-0"></div>
      </div>
      {/* Tab Switcher */}
      <div className="flex gap-4 mb-8 justify-center">
        <button
          className={`text-sm md:text-base px-4 py-2 rounded font-semibold transition-all ${activeTab === "appointments" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={`text-sm md:text-base px-4 py-2 rounded font-semibold transition-all ${activeTab === "tests" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("tests")}
        >
          Tests
        </button>
        <button
          className={`text-sm md:text-base px-4 py-2 rounded font-semibold transition-all ${activeTab === "opds" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("opds")}
        >
          OPDS
        </button>
        <button
          className={`text-sm md:text-base px-4 py-2 rounded font-semibold transition-all ${activeTab === "profile" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>
      <div className="w-full">
        {activeTab === "appointments" && <DoctorAppointmentsTab />}
        {activeTab === "tests" && <DoctorTestsTab />}
        {activeTab === "opds" && <DoctorOpdsTab />}
        {activeTab === "profile" && <ProfileTab />}
      </div>
    </section>
  );
};
