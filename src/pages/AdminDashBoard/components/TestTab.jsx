import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IoMdRefresh } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

// Delete confirmation modal
const DeleteTestModal = ({ open, onClose, onConfirm, test }) => {
  if (!open || !test) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Delete Test</h3>
        <div className="mb-4 text-sm text-gray-700">
          <div className="mb-2">
            <b>Test:</b> {test.name}
          </div>
          <div className="mb-2">
            <b>Status:</b> {test.status || "N/A"}
          </div>
          <div className="mb-2 text-red-600 font-semibold">
            Are you sure you want to delete this test? <br />
            <span className="font-normal text-gray-700">
              <b>All schedules related to this test will be cancelled.</b>
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

const TestTab = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedTest, setExpandedTest] = useState(null);

  // Add form state
  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    duration: "",
  });

  // Edit modal state
  const [editModal, setEditModal] = useState({
    open: false,
    id: null,
    name: "",
    description: "",
    image: null,
    preview: "",
    status: "active",
    price: "",
    duration: "",
  });

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, test: null });

  // Fetch tests (type=test)
  const fetchTests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/services?type=test`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTests(data.services || []);
    } catch (err) {
      toast.error("Failed to fetch tests", { style: { fontSize: "0.85rem" } });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // Add test
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.description.trim())
      return toast.error("Name and description required", { style: { fontSize: "0.85rem" } });
    if (!addForm.price)
      return toast.error("Price is required", { style: { fontSize: "0.85rem" } });
    if (!addForm.duration.trim())
      return toast.error("Duration is required", { style: { fontSize: "0.85rem" } });
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", addForm.name);
      formData.append("description", addForm.description);
      formData.append("type", "test");
      formData.append("duration", addForm.duration);
      formData.append("price", addForm.price);
      if (addForm.image) formData.append("image", addForm.image);

      const res = await fetch(`${backendUrl}/services`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add test");
      setAddForm({
        name: "",
        description: "",
        image: null,
        price: "",
        duration: "",
      });
      toast.success("Test added!", { style: { fontSize: "0.85rem" } });
      fetchTests();
    } catch (err) {
      toast.error(err.message || "Failed to add test", { style: { fontSize: "0.85rem" } });
    }
    setLoading(false);
  };

  // Open delete modal
  const openDeleteModal = (test) => {
    setDeleteModal({ open: true, test });
  };

  // Confirm delete
  const confirmDelete = async () => {
    const id = deleteModal.test?._id;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete test");
      toast.success("Test deleted!", { style: { fontSize: "0.85rem" } });
      setDeleteModal({ open: false, test: null });
      fetchTests();
    } catch (err) {
      toast.error(err.message || "Failed to delete test", { style: { fontSize: "0.85rem" } });
      setDeleteModal({ open: false, test: null });
    }
    setLoading(false);
  };

  // Open edit modal
  const openEditModal = (test) => {
    setEditModal({
      open: true,
      id: test._id,
      name: test.name,
      description: test.description,
      image: null,
      preview: test.imageUrl || test.image || "",
      status: test.status || "active",
      price: test.price || "",
      duration: test.duration || "",
    });
  };

  // Edit test
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editModal.name.trim() || !editModal.description.trim())
      return toast.error("Name and description required", { style: { fontSize: "0.85rem" } });
    if (!editModal.price)
      return toast.error("Price is required", { style: { fontSize: "0.85rem" } });
    if (!editModal.duration)
      return toast.error("Duration is required", { style: { fontSize: "0.85rem" } });
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", editModal.name);
      formData.append("description", editModal.description);
      formData.append("status", editModal.status);
      formData.append("type", "test");
      formData.append("duration", editModal.duration);
      formData.append("price", editModal.price);
      if (editModal.image) formData.append("image", editModal.image);

      const res = await fetch(`${backendUrl}/services/${editModal.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update test");
      setEditModal({
        open: false,
        id: null,
        name: "",
        description: "",
        image: null,
        preview: "",
        status: "active",
        price: "",
        duration: "",
      });
      toast.success("Test updated!", { style: { fontSize: "0.85rem" } });
      fetchTests();
    } catch (err) {
      toast.error(err.message || "Failed to update test", { style: { fontSize: "0.85rem" } });
    }
    setLoading(false);
  };

  // Helper to format duration in minutes
  function formatDuration(duration) {
    const min = parseInt(duration, 10);
    if (isNaN(min)) return duration;
    if (min < 60) return `${min} min`;
    const hr = Math.floor(min / 60);
    const rem = min % 60;
    return rem === 0 ? `${hr} hr` : `${hr} hr ${rem} min`;
  }

  return (
    <div className="max-w-8xl mx-auto text-xs sm:text-sm md:text-base">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Manage Tests</h3>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          onClick={fetchTests}
          title="Refresh"
          disabled={loading}
        >
          <IoMdRefresh className="text-xl text-blue-900" />
        </button>
      </div>
      {/* Add Test Form */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-2 mb-6 bg-white p-4 rounded shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Test name"
            value={addForm.name}
            onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
            disabled={loading}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="border px-3 py-2 rounded w-full"
            onChange={e => setAddForm(f => ({ ...f, image: e.target.files[0] }))}
            disabled={loading}
          />
          <input
            type="number"
            className="border px-3 py-2 rounded w-full"
            placeholder="Price"
            value={addForm.price}
            onChange={e => setAddForm(f => ({ ...f, price: e.target.value }))}
            disabled={loading}
            min={0}
            required
          />
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Duration (e.g. 30 min)"
            value={addForm.duration}
            onChange={e => setAddForm(f => ({ ...f, duration: e.target.value }))}
            disabled={loading}
            required
          />
        </div>
        <textarea
          className="border px-3 py-2 rounded w-full"
          placeholder="Test description"
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
          Add Test
        </button>
      </form>
      {loading && <div className="mb-4">Loading...</div>}
      {/* Test List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4"></th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Duration</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No tests found.
                </td>
              </tr>
            ) : (
              tests.map((t) => (
                <React.Fragment key={t._id}>
                  <tr>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => setExpandedTest(expandedTest === t._id ? null : t._id)}
                        className="text-blue-900"
                        title={expandedTest === t._id ? "Hide Details" : "Show Details"}
                      >
                        {expandedTest === t._id ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      {t.image ? (
                        <img src={t.image} alt={t.name} className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="py-2 px-4">{t.name}</td>
                    <td className="py-2 px-4">{t.price ? `₹${t.price}` : "-"}</td>
                    <td className="py-2 px-4">{formatDuration(t.duration) || "-"}</td>
                    <td className="py-2 px-4">{t.status || "N/A"}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded"
                        onClick={() => openEditModal(t)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => openDeleteModal(t)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedTest === t._id && (
                    <tr>
                      <td colSpan={7} className="bg-gray-50 border-t">
                        <div className="p-4">
                          <div className="font-semibold mb-2">Test Details</div>
                          <div className="mb-2">
                            <b>Description:</b>
                            <div className="mt-1 text-gray-700 whitespace-pre-line break-words">
                              {t.description}
                            </div>
                          </div>
                          <div className="mb-2">
                            <b>Duration:</b> {formatDuration(t.duration) || "-"}
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
                  price: "",
                  duration: "",
                })
              }
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-center">Edit Test</h3>
            <form onSubmit={handleEditSave} className="flex flex-col gap-2">
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="Test name"
                value={editModal.name}
                onChange={e => setEditModal(f => ({ ...f, name: e.target.value }))}
                disabled={loading}
                required
              />
              <textarea
                className="border px-3 py-2 rounded w-full"
                placeholder="Test description"
                value={editModal.description}
                onChange={e => setEditModal(f => ({ ...f, description: e.target.value }))}
                disabled={loading}
                rows={2}
                required
              />
              <input
                type="number"
                className="border px-3 py-2 rounded w-full"
                placeholder="Price"
                value={editModal.price}
                onChange={e => setEditModal(f => ({ ...f, price: e.target.value }))}
                disabled={loading}
                min={0}
                required
              />
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
              <p className="text-sm text-red-600">*On making test inactive, all schedules related to this test will be cancelled.</p>
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
                  onClick={() => setEditModal({ open: false, id: null, name: "", description: "", image: null, preview: "", status: "active", price: "", duration: "" })}
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
      <DeleteTestModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, test: null })}
        onConfirm={confirmDelete}
        test={deleteModal.test}
      />
    </div>
  );
};

export default TestTab;