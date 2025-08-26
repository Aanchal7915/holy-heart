import React, { useState, useEffect } from "react";
import Spinner from "../../../components/Spinner";
import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const ConfirmModal = ({ open, user, onClose, onConfirm, modalApiStatus }) => {
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-90">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full max-w-xs md:max-w-md mx-2 relative text-xs sm:text-sm md:text-base">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          <IoMdCloseCircleOutline className="text-3xl" />
        </button>
        <h3 className="text-lg md:text-xl font-bold text-center">Confirm Action</h3>
        <div className="bg-red-500 h-[4px] w-[80px] md:w-[80px] mx-auto mt-1 mb-4 md:mb-6 pt-0"></div>

        <div className="mb-4 text-xs md:text-base">
          <div className="mb-2">
            <b>Name:</b> {user.name}
          </div>
          <div className="mb-2">
            <b>Email:</b> {user.email}
          </div>
          <div className="mb-2">
            <b>Phone:</b> {user.phoneNu}
          </div>
          <div className="mb-2">
            <b>Role:</b> {user.role}
          </div>
          <div className="mb-2">
            <b>Status:</b> {user.isBlocked ? "Blocked" : "Active"}
          </div>
          <div className="mb-2 text-red-600 font-semibold">
            Are you sure you want to {user.isBlocked ? "unblock" : "block"} this user?
          </div>
        </div>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          onClick={onConfirm}
          disabled={modalApiStatus === "loading"}
        >
          {modalApiStatus === "loading"
            ? (user.isBlocked ? "Unblocking..." : "Blocking...")
            : `Yes, ${user.isBlocked ? "Unblock" : "Block"}`}
        </button>
      </div>
    </div>
  );
};

const AdminUsersTab = () => {
  const [users, setUsers] = useState([]);
  const [apiStatus, setApiStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Modal API status
  const [modalApiStatus, setModalApiStatus] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Email search state
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page, limit]);

  const fetchUsers = async (emailParam) => {
    setApiStatus("loading");
    setErrorMsg("");
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({
        page,
        limit,
      });
      if (emailParam) params.append("email", emailParam);
      const res = await fetch(`${backendUrl}/user/all?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data.users || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setApiStatus("success");
    } catch (err) {
      setUsers([]);
      setTotal(0);
      setTotalPages(1);
      setApiStatus("error");
      setErrorMsg(err.message || "Error fetching users");
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setModalApiStatus(""); // Reset modal API status
  };
  const closeModal = () => setShowModal(false);

  const handleBlockUnblock = async () => {
    if (!selectedUser) return;
    setModalApiStatus("loading");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/user/${selectedUser._id}/block`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isBlocked: !selectedUser.isBlocked })
      });
      if (!res.ok) throw new Error("Failed to update user status");
      closeModal();
      fetchUsers();
      setModalApiStatus("");
      toast.success(
        `User ${selectedUser.email} has been ${selectedUser.isBlocked ? "unblocked" : "blocked"} successfully!`
      );
    } catch (err) {
      setModalApiStatus("error");
      toast.error(
        `Failed to ${selectedUser.isBlocked ? "unblock" : "block"} user!"`
      );
    }
  };

  // Handle search by email on Enter key or button click
  const handleEmailSearch = () => {
    setPage(1);
    fetchUsers(searchEmail.trim());
  };
  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEmailSearch();
    }
  };

  return (
    <section className="p-2 md:p-8 bg-gray-50 min-h-screen text-xs sm:text-sm md:text-base">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="mb-6 flex flex-row flex-wrap items-center gap-2">
        <h2 className="text-xl sm:text-2xl font-bold">Users</h2>
        <button
          className="px-3 pt-1 bg-inherit rounded"
          onClick={() => fetchUsers(searchEmail.trim())}
        >
          <IoMdRefresh className="text-blue-900 text-xl" />
        </button>
      </div>
      {/* Email Search Input */}
      <div className="mb-6 flex items-center w-full w-[90%] max-w-xs bg-blue-600 rounded">
        <input
          type="text"
          placeholder="Search by email"
          className="outline-none rounded border px-3 py-2 bg-white w-full text-xs sm:text-sm md:text-base"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
          onKeyDown={handleEmailKeyDown}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r"
          onClick={handleEmailSearch}
          aria-label="Search"
          tabIndex={0}
        >
          <IoMdSearch />
        </button>
      </div>
      {apiStatus === "error" && errorMsg && (
        <div className="text-center text-red-600 text-xs sm:text-sm md:text-lg mb-4">
          <div className="text-red-600 text-xs sm:text-sm md:text-lg mb-4">Something went wrong. Please try again.</div>
          <button
            className="px-3 md:px-4 py-2 bg-blue-900 text-white rounded transition text-xs sm:text-sm"
            onClick={() => fetchUsers(searchEmail.trim())}
          >
            Refresh
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        {apiStatus === "loading" ? (
          <div className="text-center py-8"><Spinner /></div>
        ) : (
          <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-2 md:px-4">Name</th>
                <th className="py-2 px-2 md:px-4">Email</th>
                <th className="py-2 px-2 md:px-4">Phone</th>
                <th className="py-2 px-2 md:px-4">Role</th>
                <th className="py-2 px-2 md:px-4">Status</th>
                <th className="py-2 px-2 md:px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u, idx) => (
                  <tr key={u._id || idx} className="border-b">
                    <td className="py-2 px-2 md:px-4">{u.name}</td>
                    <td className="py-2 px-2 md:px-4">{u.email}</td>
                    <td className="py-2 px-2 md:px-4">{u.phoneNu}</td>
                    <td className="py-2 px-2 md:px-4 capitalize">{u.role}</td>
                    <td className="py-2 px-2 md:px-4">{u.isBlocked ? "Blocked" : "Active"}</td>
                    <td className="py-2 px-2 md:px-4">
                      <button
                        className={`px-2 md:px-3 py-1 rounded text-xs md:text-base ${u.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
                        onClick={() => openModal(u)}
                        disabled={apiStatus === "loading"}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Confirm Modal */}
      <ConfirmModal
        open={showModal}
        user={selectedUser}
        onClose={closeModal}
        onConfirm={handleBlockUnblock}
        modalApiStatus={modalApiStatus}
      />
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

export default AdminUsersTab;