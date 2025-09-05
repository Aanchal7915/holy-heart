import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IoMdRefresh, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

// Delete confirmation modal for doctor
const DeleteDoctorModal = ({ open, onClose, onConfirm, doctor }) => {
  if (!open || !doctor) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Delete Doctor</h3>
        <div className="mb-4 text-sm text-gray-700">
          <div className="mb-2">
            <b>Name:</b> {doctor.name}
          </div>
          <div className="mb-2">
            <b>Email:</b> {doctor.email}
          </div>
          <div className="mb-2">
            <b>Phone:</b> {doctor.phoneNu}
          </div>
          <div className="mb-2 text-red-600 font-semibold">
            Are you sure you want to delete this doctor? <br />
            <span className="font-normal text-gray-700">
              <b>All appointments related to this doctor will be cancelled.</b>
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DoctorTab = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add form state
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    phoneNu: "",
    image: null,
    status: "active",
    password: "",
    gender: "",
    address: "",
  });

  // Edit modal state
  const [editModal, setEditModal] = useState({
    open: false,
    id: null,
    name: "",
    email: "",
    phoneNu: "",
    image: null,
    preview: "",
    status: "active",
    gender: "",
    address: "",
  });

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, doctor: null });

  // Expanded doctor details
  const [expandedDoctor, setExpandedDoctor] = useState(null);

  // Doctor slot management
  const [doctorSlots, setDoctorSlots] = useState({});
  const [slotLoading, setSlotLoading] = useState(false);
  const [slotForm, setSlotForm] = useState({
    service: "",
    day: "Mon",
    start: "",
    end: "",
  });

  // Services for slot selection
  const [services, setServices] = useState([]);

  // Assign service form state
  const [assignServiceForm, setAssignServiceForm] = useState({
    service: "",
    chargePerAppointment: "",
  });

  // Fetch slots and services for a doctor (single network call)
  const fetchDoctorSlots = async (doctorId) => {
    setSlotLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors/slots/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // The endpoint returns { slots: { ... } }
      setDoctorSlots((prev) => ({ ...prev, [doctorId]: data.slots || null }));
    } catch (err) {
      toast.error("Failed to fetch doctor slots");
    }
    setSlotLoading(false);
  };

  // Fetch all services for slot assignment
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setServices(data.services || []);
    } catch (err) {
      toast.error("Failed to fetch services");
    }
  };

  // Fetch doctors
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch (err) {
      toast.error("Failed to fetch doctors");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
    fetchServices();
  }, []);

  // Add doctor
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.email.trim() || !addForm.phoneNu.trim() || !addForm.password.trim()) {
      return toast.error("Name, email, phone, and password are required");
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", addForm.name);
      formData.append("email", addForm.email);
      formData.append("phoneNu", addForm.phoneNu);
      formData.append("status", addForm.status);
      formData.append("password", addForm.password);
      formData.append("gender", addForm.gender);
      formData.append("address", addForm.address);
      if (addForm.image) formData.append("image", addForm.image);

      const res = await fetch(`${backendUrl}/doctors`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add doctor");
      setAddForm({
        name: "",
        email: "",
        phoneNu: "",
        image: null,
        status: "active",
        password: "",
        gender: "",
        address: "",
      });
      toast.success("Doctor added!");
      fetchDoctors();
    } catch (err) {
      toast.error(err.message || "Failed to add doctor");
    }
    setLoading(false);
  };

  // Open delete modal
  const openDeleteModal = (doctor) => {
    setDeleteModal({ open: true, doctor });
  };

  // Confirm delete
  const confirmDelete = async () => {
    const id = deleteModal.doctor?._id;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete doctor");
      toast.success("Doctor deleted!");
      setDeleteModal({ open: false, doctor: null });
      fetchDoctors();
    } catch (err) {
      toast.error(err.message || "Failed to delete doctor");
      setDeleteModal({ open: false, doctor: null });
    }
    setLoading(false);
  };

  // Open edit modal
  const openEditModal = (doctor) => {
    setEditModal({
      open: true,
      id: doctor._id,
      name: doctor.name || "",
      email: doctor.email || "",
      phoneNu: doctor.phoneNu || "",
      image: null,
      preview: doctor.imageUrl || "",
      status: doctor.status || "active",
      gender: doctor.gender || "",
      address: doctor.address || "",
    });
  };

  // Edit doctor
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editModal.name.trim() || !editModal.email.trim() || !editModal.phoneNu.trim()) {
      return toast.error("Name, email, and phone are required");
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", editModal.name);
      formData.append("email", editModal.email);
      formData.append("phoneNu", editModal.phoneNu);
      formData.append("status", editModal.status);
      formData.append("gender", editModal.gender);
      formData.append("address", editModal.address);
      if (editModal.image) formData.append("image", editModal.image);

      const res = await fetch(`${backendUrl}/doctors/${editModal.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update doctor");
      setEditModal({
        open: false,
        id: null,
        name: "",
        email: "",
        phoneNu: "",
        image: null,
        preview: "",
        status: "active",
        gender: "",
        address: "",
      });
      toast.success("Doctor updated!");
      fetchDoctors();
    } catch (err) {
      toast.error(err.message || "Failed to update doctor");
    }
    setLoading(false);
  };

  // Toggle doctor details (fetches slots/services only once per expand)
  const handleToggleDoctor = (doctorId) => {
    if (expandedDoctor === doctorId) {
      setExpandedDoctor(null);
    } else {
      setExpandedDoctor(doctorId);
      fetchDoctorSlots(doctorId);
    }
  };

  // Add slot for doctor (no duplicate fetch)
  const handleAddSlot = async (doctorId) => {
    if (!slotForm.service || !slotForm.day || !slotForm.start || !slotForm.end) {
      toast.error("All slot fields are required");
      return;
    }
    setSlotLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors/slots/${doctorId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: slotForm.service,
          day: slotForm.day,
          start: slotForm.start,
          end: slotForm.end,
        }),
      });
      if (!res.ok) throw new Error("Failed to add slot");
      toast.success("Slot added!");
      fetchDoctorSlots(doctorId);
      setSlotForm({
        service: "",
        day: "Mon",
        start: "",
        end: "",
      });
    } catch (err) {
      toast.error(err.message || "Failed to add slot");
    }
    setSlotLoading(false);
  };

  // Delete slot for doctor (no duplicate fetch)
  const handleDeleteSlot = async (doctorId, day, slotIdx) => {
    setSlotLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors/slots/${doctorId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ day, slotId:slotIdx }),
      });
      if (!res.ok) throw new Error("Failed to delete slot");
      toast.success("Slot deleted!");
      fetchDoctorSlots(doctorId);
    } catch (err) {
      toast.error(err.message || "Failed to delete slot");
    }
    setSlotLoading(false);
  };

  // Remove a service from doctor (no duplicate fetch)
  const handleRemoveService = async (doctorId, serviceId) => {
    setSlotLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors/service/${doctorId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceId }),
      });
      if (!res.ok) throw new Error("Failed to remove service");
      toast.success("Service removed from doctor!");
      fetchDoctorSlots(doctorId);
    } catch (err) {
      toast.error(err.message || "Failed to remove service");
    }
    setSlotLoading(false);
  };

  // Assign a service to doctor (no duplicate fetch)
  const handleAssignService = async (doctorId) => {
    if (!assignServiceForm.service || !assignServiceForm.chargePerAppointment) {
      toast.error("Select service and enter charge");
      return;
    }
    setSlotLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/doctors/service/${doctorId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: assignServiceForm.service,
          chargePerAppointment: assignServiceForm.chargePerAppointment,
        })
      });
      if (!res.ok) throw new Error("Failed to assign service");
      toast.success("Service assigned to doctor!");
      fetchDoctorSlots(doctorId);
      setAssignServiceForm({ service: "", chargePerAppointment: "" });
    } catch (err) {
      toast.error(err.message || "Failed to assign service");
    }
    setSlotLoading(false);
  };

  return (
    <div className="max-w-8xl mx-auto text-xs sm:text-sm md:text-base">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Manage Doctors</h3>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          onClick={fetchDoctors}
          title="Refresh"
          disabled={loading}
        >
          <IoMdRefresh className="text-xl text-blue-900" />
        </button>
      </div>
      {/* Add Doctor Form */}
      <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-6 bg-white p-4 rounded shadow max-w-2xl">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Doctor name"
            value={addForm.name}
            onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
            disabled={loading}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="border px-3 py-2 rounded w-full md:w-auto"
            onChange={e => setAddForm(f => ({ ...f, image: e.target.files[0] }))}
            disabled={loading}
            required
          />
        </div>
        <input
          type="email"
          className="border px-3 py-2 rounded w-full"
          placeholder="Email"
          value={addForm.email}
          onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))}
          disabled={loading}
          required
        />
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Phone Number"
          value={addForm.phoneNu}
          onChange={e => setAddForm(f => ({ ...f, phoneNu: e.target.value }))}
          disabled={loading}
          required
        />
        <input
          type="password"
          className="border px-3 py-2 rounded w-full"
          placeholder="Password"
          value={addForm.password}
          onChange={e => setAddForm(f => ({ ...f, password: e.target.value }))}
          disabled={loading}
          required
        />
        <select
          className="border px-3 py-2 rounded w-full"
          value={addForm.gender}
          onChange={e => setAddForm(f => ({ ...f, gender: e.target.value }))}
          disabled={loading}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Address"
          value={addForm.address}
          onChange={e => setAddForm(f => ({ ...f, address: e.target.value }))}
          disabled={loading}
          required
        />
        <select
          className="border px-3 py-2 rounded w-full"
          value={addForm.status}
          onChange={e => setAddForm(f => ({ ...f, status: e.target.value }))}
          disabled={loading}
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded w-full md:w-auto"
          disabled={loading}
        >
          Add Doctor
        </button>
      </form>
      {loading && <div className="mb-4">Loading...</div>}
      {/* Doctor List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4"></th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Gender</th>
              {/* <th className="py-2 px-4">Status</th> */}
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No doctors found.
                </td>
              </tr>
            ) : (
              doctors.map((d) => (
                <React.Fragment key={d._id}>
                  <tr>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleToggleDoctor(d._id)}
                        className="text-blue-900"
                        title={expandedDoctor === d._id ? "Hide Details" : "Show Details"}
                      >
                        {expandedDoctor === d._id ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </button>
                    </td>
                    <td className="py-2 px-4">{d.name}</td>
                    <td className="py-2 px-4">{d.email}</td>
                    <td className="py-2 px-4">{d.phoneNu}</td>
                    <td className="py-2 px-4">{d.gender}</td>
                    {/* <td className="py-2 px-4">{d.status || "N/A"}</td> */}
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded"
                        onClick={() => openEditModal(d)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      {/* <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => openDeleteModal(d)}
                        disabled={loading}
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                  {expandedDoctor === d._id && (
                    <tr>
                      <td colSpan={7} className="bg-gray-50 border-t">
                        {/* Doctor Personal Details */}
                        <div className="p-4">
                          <div className="font-semibold mb-2">Personal Details</div>
                          <div className="flex flex-wrap gap-4 mb-2">
                            <div><b>Name:</b> {d.name}</div>
                            <div><b>Email:</b> {d.email}</div>
                            <div><b>Phone:</b> {d.phoneNu}</div>
                            <div><b>Gender:</b> {d.gender}</div>
                            {/* <div><b>Status:</b> {d.status}</div> */}
                            <div><b>Address:</b> {d?.address||"-"}</div>
                          </div>
                          {/* <button
                            className="bg-blue-600 text-white px-3 py-1 rounded mb-4"
                            onClick={() => openEditModal(d)}
                            disabled={loading}
                          >
                            Edit Details
                          </button> */}
                          {/* Doctor Services */}
                          <div className="font-semibold mb-2 mt-4">Services Provided</div>
                          {doctorSlots[d._id]?.services?.length > 0 ? (
                            <ul className="mb-4">
                              {doctorSlots[d._id].services.map((srv, idx) => (
                                <li key={srv._id || srv.service?._id || idx} className="flex items-center gap-2 mb-1">
                                  <span>
                                    {srv.service?.name || "Service"}
                                    {srv.chargePerAppointment ? ` (₹${srv.chargePerAppointment})` : ""}
                                  </span>
                                  <button
                                    className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleRemoveService(d._id, srv.service?._id)}
                                    disabled={slotLoading}
                                  >
                                    Remove
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-gray-500 mb-4">No services assigned.</div>
                          )}
                          {/* Assign Service Form */}
                          <form
                            className="flex flex-wrap gap-2 mb-4 items-end"
                            onSubmit={e => {
                              e.preventDefault();
                              handleAssignService(d._id);
                            }}
                          >
                            <select
                              className="border px-2 py-1 rounded"
                              value={assignServiceForm.service}
                              onChange={e => setAssignServiceForm(f => ({ ...f, service: e.target.value }))}
                              required
                            >
                              <option value="">Select Service</option>
                              {services
                                // Only show services not already assigned to doctor
                                .filter(s =>
                                  !(doctorSlots[d._id]?.services || []).some(ds => ds.service?._id === s._id)
                                )
                                .map(s => (
                                  <option key={s._id} value={s._id}>{s.name}</option>
                                ))}
                            </select>
                            <input
                              type="number"
                              className="border px-2 py-1 rounded w-32"
                              placeholder="Charge"
                              value={assignServiceForm.chargePerAppointment}
                              onChange={e => setAssignServiceForm(f => ({ ...f, chargePerAppointment: e.target.value }))}
                              required
                            />
                            <button
                              type="submit"
                              className="bg-blue-600 text-white px-3 py-1 rounded"
                              disabled={slotLoading}
                            >
                              Assign Service
                            </button>
                          </form>
                          {/* Doctor Slot Management */}
                          <div className="font-semibold mb-2 mt-4">Doctor Availing Slots</div>
                          {slotLoading ? (
                            <div>Loading slots...</div>
                          ) : (
                            <div>
                              {doctorSlots[d._id]?.weeklyAvailability?.length > 0 ? (
                                doctorSlots[d._id].weeklyAvailability.map((dayObj, idx) => (
                                  <div key={dayObj.day} className="mb-2">
                                    <div className="font-bold">{dayObj.day}</div>
                                    <ul>
                                      {dayObj.slots.map((slot, sidx) => (
                                        <li key={slot._id || sidx} className="flex items-center gap-2">
                                          <span>
                                            {(slot.service?.name) || "Service"}: {slot.start} - {slot.end}
                                            {slot.chargePerAppointment ? ` (₹${slot.chargePerAppointment})` : ""}
                                          </span>
                                          <button
                                            className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDeleteSlot(d._id, dayObj.day, slot._id)}
                                            disabled={slotLoading}
                                          >
                                            Delete
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))
                              ) : (
                                <div className="text-gray-500">No slots available.</div>
                              )}
                            </div>
                          )}
                          {/* Add Slot Form */}
                          <form
                            className="flex flex-wrap gap-2 mt-4 items-end"
                            onSubmit={e => {
                              e.preventDefault();
                              handleAddSlot(d._id);
                            }}
                          >
                            <select
                              className="border px-2 py-1 rounded"
                              value={slotForm.service}
                              onChange={e => setSlotForm(f => ({ ...f, service: e.target.value }))}
                              required
                            >
                              <option value="">Select Service</option>
                              {(doctorSlots[d._id]?.services || []).map(srv => (
                                <option key={srv.service?._id} value={srv.service?._id}>
                                  {srv.service?.name}
                                </option>
                              ))}
                            </select>
                            <select
                              className="border px-2 py-1 rounded"
                              value={slotForm.day}
                              onChange={e => setSlotForm(f => ({ ...f, day: e.target.value }))}
                              required
                            >
                              {daysOfWeek.map(day => (
                                <option key={day} value={day}>{day}</option>
                              ))}
                            </select>
                            <input
                              type="time"
                              className="border px-2 py-1 rounded"
                              value={slotForm.start}
                              onChange={e => setSlotForm(f => ({ ...f, start: e.target.value }))}
                              required
                            />
                            <input
                              type="time"
                              className="border px-2 py-1 rounded"
                              value={slotForm.end}
                              onChange={e => setSlotForm(f => ({ ...f, end: e.target.value }))}
                              required
                            />
                            <button
                              type="submit"
                              className="bg-green-600 text-white px-3 py-1 rounded"
                              disabled={slotLoading}
                            >
                              Add Slot
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => setEditModal({
                open: false,
                id: null,
                name: "",
                email: "",
                phoneNu: "",
                image: null,
                preview: "",
                status: "active",
                gender: "",
                address: "",
              })}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-center">Edit Doctor</h3>
            <form onSubmit={handleEditSave} className="flex flex-col gap-2">
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="Doctor name"
                value={editModal.name}
                onChange={e => setEditModal(f => ({ ...f, name: e.target.value }))}
                disabled={loading}
                required
              />
              <input
                type="email"
                className="border px-3 py-2 rounded w-full"
                placeholder="Email"
                value={editModal.email}
                onChange={e => setEditModal(f => ({ ...f, email: e.target.value }))}
                disabled={loading}
                required
              />
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="Phone Number"
                value={editModal.phoneNu}
                onChange={e => setEditModal(f => ({ ...f, phoneNu: e.target.value }))}
                disabled={loading}
              />
              <select
                className="border px-3 py-2 rounded w-full"
                value={editModal.gender}
                onChange={e => setEditModal(f => ({ ...f, gender: e.target.value }))}
                disabled={loading}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="Address"
                value={editModal.address}
                onChange={e => setEditModal(f => ({ ...f, address: e.target.value }))}
                disabled={loading}
              />
              <select
                className="border px-3 py-2 rounded w-full"
                value={editModal.status}
                onChange={e => setEditModal(f => ({ ...f, status: e.target.value }))}
                disabled={loading}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <p className="text-sm text-red-600">*On making doctor inactive, all appointments related to this doctor will be cancelled.</p>
              <input
                type="file"
                accept="image/*"
                className="border px-3 py-2 rounded w-full"
                onChange={e => {
                  const file = e.target.files[0];
                  setEditModal(f => ({
                    ...f,
                    image: file,
                    preview: file ? URL.createObjectURL(file) : f.preview,
                  }));
                }}
                disabled={loading}
              />
              {editModal.preview && (
                <img src={editModal.preview} alt="Preview" className="w-16 h-16 object-cover rounded mb-2" />
              )}
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setEditModal({
                    open: false,
                    id: null,
                    name: "",
                    email: "",
                    phoneNu: "",
                    image: null,
                    preview: "",
                    status: "active",
                    gender: "",
                    address: "",
                  })}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      <DeleteDoctorModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, doctor: null })}
        onConfirm={confirmDelete}
        doctor={deleteModal.doctor}
      />
    </div>
  );
};

export default DoctorTab;