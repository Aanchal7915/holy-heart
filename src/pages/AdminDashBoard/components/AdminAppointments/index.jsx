import React, { useState, useEffect } from "react";
import Spinner from "../../../../components/Spinner";
import { IoMdRefresh } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceAppointments from "./components/ServiceAppointments";
import OpdsAppointments from "./components/OpdsAppointments";
import TestAppointments from "./components/TestAppointments";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const AdminAppointments = () => {
  const [activeSubTab, setActiveSubTab] = useState("service");
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

  // --- NEW: Service list for filter dropdown ---
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [filters, sort, limit, page]);

  // --- NEW: Fetch services for filter dropdown ---
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendUrl}/services`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        setServiceList(data.services || []);
      } catch {
        setServiceList([]);
      }
    };
    fetchServices();
  }, []);

  const fetchAppointments = async () => {
    setApiStatus("loading");
    setErrorMsg("");
    try {
      const params = new URLSearchParams({
        status: filters.status,
        service: filters.designation,
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
      </div>
      {/* Sub-tabs for appointment types */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded font-semibold transition-all text-sm md:text-base ${activeSubTab === "service" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveSubTab("service")}
        >
          Service
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-all text-sm md:text-base ${activeSubTab === "opds" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveSubTab("opds")}
        >
          OPDS
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-all text-sm md:text-base ${activeSubTab === "test" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveSubTab("test")}
        >
          Test Booking
        </button>
      </div>
      {/* Render corresponding component */}
      <div>
        {activeSubTab === "service" && <ServiceAppointments />}
        {activeSubTab === "opds" && <OpdsAppointments />}
        {activeSubTab === "test" && <TestAppointments />}
      </div>
    </section>
  );
};

export default AdminAppointments;
