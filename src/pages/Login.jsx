import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const SpinnerInBtn = () => (
  <svg className="animate-spin h-5 w-5 text-white inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
  </svg>
);

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [apiStatus, setApiStatus] = useState("idle");
  const [error, setError] = useState("");
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
    setError("");
    try {
      const res = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.userRole || "user");
        setApiStatus("success");
        toast.success(data.message || "Login successful");
        setForm({ email: "", password: "" });
        setTimeout(() => {
          if ((data.role || "user") === "admin") navigate("/admin-dashboard");
          else navigate("/user-dashboard");
        }, 1200);
      } else {
        setApiStatus("error");
        setError(data.error || "Login failed");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setApiStatus("error");
      setError("Something went wrong. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <p className="text-gray-600 text-center mb-6">
          Welcome back! Please login to access your dashboard, manage appointments, and view your profile.<br />
          If you don't have an account, you can easily create one.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition flex items-center justify-center"
            disabled={apiStatus === "loading"}
          >
            {apiStatus === "loading" && <SpinnerInBtn />}
            Login
          </button>
          {error && (
            <div className="text-red-500 text-sm text-center mt-2">{error}</div>
          )}
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">Don't have an account?</span>{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register here
          </Link>
          <div className="text-xs text-gray-500 mt-2">
            Create an account to book appointments, track your health, and get personalized care.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
