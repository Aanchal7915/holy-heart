import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const Spinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);
const Toast = ({ message, onClose }) => (
  <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-6 py-3 rounded shadow-lg flex items-center gap-4">
    <span>{message}</span>
    <button className="ml-4 px-2 py-1 bg-white text-red-600 rounded" onClick={onClose}>X</button>
  </div>
);

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [apiStatus, setApiStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "admin") navigate("/admin-dashboard");
    else if (token) navigate("/user-dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiStatus("loading");
    setMessage("");
    try {
      const res = await fetch(`${backendUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 201) {
        setApiStatus("success");
        setMessage(data.message || "User registered successfully");
        setForm({ name: "", email: "", password: "", role: "user" });
        // If role is returned, store it, else default to user
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user?.role || "user");
        if ((data.user?.role || "user") === "admin") navigate("/admin-dashboard");
        else navigate("/user-dashboard");
      } else {
        setApiStatus("error");
        setMessage(data.error || "Registration failed");
      }
    } catch (err) {
      setApiStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {apiStatus === "loading" && <Spinner />}
        {message && <Toast message={message} onClose={() => setMessage("")} />}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded px-4 py-2"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
            disabled={apiStatus === "loading"}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
