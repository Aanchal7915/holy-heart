import React, { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const ConfirmModal = ({ open, user, onClose, onConfirm }) => {
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-90">
      <div className="bg-white opacity-100 rounded-lg shadow-lg p-6 min-w-[320px]">
        <h4 className="text-lg font-bold mb-2">
          {user.isBlocked ? "Unblock" : "Block"} User
        </h4>
        <div className="mb-4">
          <div><span className="font-semibold">Name:</span> {user.name}</div>
          <div><span className="font-semibold">Email:</span> {user.email}</div>
          <div><span className="font-semibold">Phone:</span> {user.phone || "-"}</div>
          <div><span className="font-semibold">Role:</span> {user.role}</div>
          <div>
            <span className="font-semibold">Current Status:</span>{" "}
            {user.isBlocked ? (
              <span className="text-red-600 font-semibold">Blocked</span>
            ) : (
              <span className="text-green-600 font-semibold">Active</span>
            )}
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold ${
              user.isBlocked
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
            onClick={onConfirm}
          >
            {user.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminUsersTab = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalUser, setModalUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/user/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      setUsers([]);
    }
    setLoading(false);
  };

  const openBlockModal = (user) => {
    setModalUser(user);
    setModalOpen(true);
  };

  const closeBlockModal = () => {
    setModalOpen(false);
    setModalUser(null);
  };

  const confirmBlockToggle = async () => {
    if (!modalUser) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${backendUrl}/user/${modalUser._id}/block`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isBlocked: !modalUser.isBlocked }),
        }
      );
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === modalUser._id ? { ...u, isBlocked: !modalUser.isBlocked } : u
          )
        );
        closeBlockModal();
      } else {
        alert("Failed to update user status.");
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      (user.phone && user.phone.includes(search));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="p-4">
      <ConfirmModal
        open={modalOpen}
        user={modalUser}
        onClose={closeBlockModal}
        onConfirm={confirmBlockToggle}
      />
      <h3 className="text-xl font-bold mb-4">Users</h3>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          className="border px-3 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={fetchUsers}
        >
          Refresh
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Registered</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.phoneNu || "-"}</td>
                    <td className="px-4 py-2 border">{user.role}</td>
                    <td className="px-4 py-2 border">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {user.isBlocked ? (
                        <span className="text-red-600 font-semibold">Blocked</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Active</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        className={`px-3 py-1 rounded font-semibold ${
                          user.isBlocked
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                        onClick={() => openBlockModal(user)}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsersTab;