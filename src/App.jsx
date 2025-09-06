import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./pages/UserDashBoard/ChatBot/ChatBot";
import Contact from "./pages/Contact";
import OurDoctor from './pages/OurDoctor';
import ScrollToTop from "./components/ScrollToTop";
import BookAppointment from "./pages/BookAppointment";
import AdminDashBoard from "./pages/AdminDashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashBoard from "./pages/UserDashBoard";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import DoctorDashBoard from "./pages/DoctorDashBoard";

// Helper to get token and role from localStorage
const getAuth = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return { token, role };
};

// Protected route for user
const UserProtectedRoute = ({ children }) => {
  const { token, role } = getAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (role === "admin") return <Navigate to="/admin-dashboard" replace />;
  return children;
};
// Protected route for admin
const AdminProtectedRoute = ({ children }) => {
  const { token, role } = getAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/user-dashboard" replace />;
  return children;
};

function App() {
  return (
    <div className="sm:min-w-0 min-w-[300px] sm:overflow-x-visible overflow-x-auto bg-gray-100">
      <Navbar />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={
          <AdminProtectedRoute>
            <AdminDashBoard />
          </AdminProtectedRoute>
        } />
        <Route path="/user-dashboard" element={
          <UserProtectedRoute>
            <UserDashBoard />
          </UserProtectedRoute>
        } />
        <Route path="/doctor-dashboard" element={<DoctorDashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} /> 
        <Route path="reset-password/:id/:token" element={<ChangePassword />} />
        <Route path="verify-email/:id/:token" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/services" element={<Service />} />
        <Route path="/our-doctors" element={<OurDoctor/>}/>
        <Route path="/book-appointment" element={<BookAppointment/>}/>
      </Routes>
      <Footer />
      {/* Floating ChatBot widget */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
        <ChatBot />
      </div>
    </div>
  );
}

export default App;