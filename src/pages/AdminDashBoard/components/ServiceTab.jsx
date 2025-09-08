import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IoMdRefresh } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

// Delete confirmation modal
const DeleteServiceModal = ({ open, onClose, onConfirm, service }) => {
  if (!open || !service) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Delete Service</h3>
        <div className="mb-4 text-sm text-gray-700">
          <div className="mb-2">
            <b>Service:</b> {service.name}
          </div>
          <div className="mb-2">
            <b>Status:</b> {service.status || "N/A"}
          </div>
          <div className="mb-2 text-red-600 font-semibold">
            Are you sure you want to delete this service? <br />
            <span className="font-normal text-gray-700">
              <b>All schedules related to this service will be cancelled.</b>
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

const ServiceTab = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add form state (add type, price, duration)
  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    image: null,
    type: "treatment",
    price: "",
    duration: "",
  });

  // Edit modal state (add type, price, duration)
  const [editModal, setEditModal] = useState({
    open: false,
    id: null,
    name: "",
    description: "",
    image: null,
    preview: "",
    status: "active",
    type: "treatment",
    price: "",
    duration: "",
  });

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, service: null });

  // Fetch services
  const fetchServices = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Add service (make price required for both types)
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.description.trim())
      return toast.error("Name and description required");
    if (!addForm.price)
      return toast.error("Price is required for all service types");
    if (!addForm.duration.trim())
      return toast.error("Duration is required");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", addForm.name);
      formData.append("description", addForm.description);
      formData.append("type", addForm.type);
      formData.append("duration", addForm.duration);
      formData.append("price", addForm.price); // Always append price
      if (addForm.image) formData.append("image", addForm.image);

      const res = await fetch(`${backendUrl}/services`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add service");
      setAddForm({
        name: "",
        description: "",
        image: null,
        type: "treatment",
        price: "",
        duration: "",
      });
      toast.success("Service added!");
      fetchServices();
    } catch (err) {
      toast.error(err.message || "Failed to add service");
    }
    setLoading(false);
  };

  // Open delete modal
  const openDeleteModal = (service) => {
    setDeleteModal({ open: true, service });
  };

  // Confirm delete
  const confirmDelete = async () => {
    const id = deleteModal.service?._id;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete service");
      toast.success("Service deleted!");
      setDeleteModal({ open: false, service: null });
      fetchServices();
    } catch (err) {
      toast.error(err.message || "Failed to delete service");
      setDeleteModal({ open: false, service: null });
    }
    setLoading(false);
  };

  // Open edit modal (include type, price, duration)
  const openEditModal = (service) => {
    setEditModal({
      open: true,
      id: service._id,
      name: service.name,
      description: service.description,
      image: null,
      preview: service.imageUrl || service.image || "",
      status: service.status || "active",
      type: service.type || "treatment",
      price: service.price || "",
      duration: service.duration || "",
    });
  };

  // Edit service (include type, price, duration)
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editModal.name.trim() || !editModal.description.trim())
      return toast.error("Name and description required");
    if (editModal.type === "test" && !editModal.price)
      return toast.error("Price is required for test type");
    if (!editModal.duration.trim())
      return toast.error("Duration is required");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", editModal.name);
      formData.append("description", editModal.description);
      formData.append("status", editModal.status);
      formData.append("type", editModal.type);
      formData.append("duration", editModal.duration);
      if (editModal.type === "test" && editModal.price)
        formData.append("price", editModal.price);
      if (editModal.image) formData.append("image", editModal.image);

      const res = await fetch(`${backendUrl}/services/${editModal.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update service");
      setEditModal({
        open: false,
        id: null,
        name: "",
        description: "",
        image: null,
        preview: "",
        status: "active",
        type: "treatment",
        price: "",
        duration: "",
      });
      toast.success("Service updated!");
      fetchServices();
    } catch (err) {
      toast.error(err.message || "Failed to update service");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-8xl mx-auto text-xs sm:text-sm md:text-base">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Manage Services</h3>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          onClick={fetchServices}
          title="Refresh"
          disabled={loading}
        >
          <IoMdRefresh className="text-xl text-blue-900" />
        </button>
      </div>
      {/* Add Service Form */}
      <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-6 bg-white p-4 rounded shadow">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Service name"
            value={addForm.name}
            onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
            disabled={loading}
          />
          <input
            type="file"
            accept="image/*"
            className="border px-3 py-2 rounded w-full md:w-auto"
            onChange={e => setAddForm(f => ({ ...f, image: e.target.files[0] }))}
            disabled={loading}
          />
          {/* Type dropdown */}
          <select
            className="border px-3 py-2 rounded w-full md:w-auto"
            value={addForm.type}
            onChange={e => setAddForm(f => ({ ...f, type: e.target.value, price: e.target.value === "test" ? f.price : "" }))}
            disabled={loading}
          >
            <option value="treatment">Treatment</option>
            <option value="test">Test</option>
          </select>
          {/* Price field, only active if type is test */}
          <input
            type="number"
            className="border px-3 py-2 rounded w-full md:w-auto"
            placeholder="Price"
            value={addForm.price}
            onChange={e => setAddForm(f => ({ ...f, price: e.target.value }))}
            disabled={loading}
            min={0}
            required
          />
          {/* Duration field */}
          <input
            type="text"
            className="border px-3 py-2 rounded w-full md:w-auto"
            placeholder="Duration (e.g. 30 min)"
            value={addForm.duration}
            onChange={e => setAddForm(f => ({ ...f, duration: e.target.value }))}
            disabled={loading}
            required
          />
        </div>
        <textarea
          className="border px-3 py-2 rounded w-full"
          placeholder="Service description"
          value={addForm.description}
          onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))}
          disabled={loading}
          rows={2}
        />
        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded w-full md:w-auto"
          disabled={loading}
        >
          Add Service
        </button>
      </form>
      {loading && <div className="mb-4">Loading...</div>}
      {/* Service List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Duration</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s._id}>
                  <td className="py-2 px-4">
                    {s.image ? (
                      <img src={s.image} alt={s.name} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4">{s.name}</td>
                  <td className="py-2 px-4">{s.description}</td>
                  <td className="py-2 px-4 capitalize">{s.type || "treatment"}</td>
                  <td className="py-2 px-4">{s.type === "test" && s.price ? `₹${s.price}` : "-"}</td>
                  <td className="py-2 px-4">{s.duration || "-"}</td>
                  <td className="py-2 px-4">{s.status || "N/A"}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                      onClick={() => openEditModal(s)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => openDeleteModal(s)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
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
              onClick={() =>
                setEditModal({
                  open: false,
                  id: null,
                  name: "",
                  description: "",
                  image: null,
                  preview: "",
                  status: "active",
                  type: "treatment",
                  price: "",
                  duration: "",
                })
              }
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-center">Edit Service</h3>
            <form onSubmit={handleEditSave} className="flex flex-col gap-2">
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="Service name"
                value={editModal.name}
                onChange={e => setEditModal(f => ({ ...f, name: e.target.value }))}
                disabled={loading}
                required
              />
              <textarea
                className="border px-3 py-2 rounded w-full"
                placeholder="Service description"
                value={editModal.description}
                onChange={e => setEditModal(f => ({ ...f, description: e.target.value }))}
                disabled={loading}
                rows={2}
                required
              />
              <select
                className="border px-3 py-2 rounded w-full"
                value={editModal.type}
                onChange={e => setEditModal(f => ({ ...f, type: e.target.value, price: e.target.value === "test" ? f.price : "" }))}
                disabled={loading}
              >
                <option value="treatment">Treatment</option>
                <option value="test">Test</option>
              </select>
              {/* Price field, only active if type is test */}
              <input
                type="number"
                className={`border px-3 py-2 rounded w-full ${editModal.type === "test" ? "" : "bg-gray-100 text-gray-400"}`}
                placeholder="Price (for test)"
                value={editModal.price}
                onChange={e => setEditModal(f => ({ ...f, price: e.target.value }))}
                disabled={loading || editModal.type !== "test"}
                min={0}
              />
              {/* Duration field */}
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="Duration (e.g. 30 min)"
                value={editModal.duration}
                onChange={e => setEditModal(f => ({ ...f, duration: e.target.value }))}
                disabled={loading}
                required
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
              <p className="text-sm text-red-600">*On making service inactive, all schedules related to this service will be cancelled.</p>
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
                  onClick={() => setEditModal({ open: false, id: null, name: "", description: "", image: null, preview: "", status: "active", type: "treatment", price: "" })}
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
      <DeleteServiceModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, service: null })}
        onConfirm={confirmDelete}
        service={deleteModal.service}
      />
    </div>
  );
};

export default ServiceTab;