import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./pages/UserDashBoard/ChatBot/ChatBot";
import Contact from "./pages/Contact";
import OurDoctor from './pages/OurDoctor';
import Test from './pages/Test';
import ScrollToTop from "./components/ScrollToTop";
import OPDBookingApp from "./pages/Opds"; // Adjust path if needed
// import AdminDashBoard from "./pages/AdminDashBoard";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
// import DoctorDashBoard  from "./pages/DoctorDashBoard";
// import NotFound from "./pages/NotFound";

// Lazy load dashboard pages
const BookAppointment = lazy(() => import("./pages/BookAppointment"));
const UserDashBoard = lazy(() => import("./pages/UserDashBoard"));
const DoctorDashBoard = lazy(() => import("./pages/DoctorDashBoard"));
const AdminDashBoard = lazy(() => import("./pages/AdminDashBoard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Helper to get token and role from localStorage
const getAuth = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return { token, role };
};

// Protected Route for Doctor
const DoctorProtectedRoute = ({ children }) => {
  const { token, role } = getAuth();
  console.log("DoctorProtectedRoute - token:", token, "role:", role);
  if (!token || role !== "doctor") return <Navigate to="/login" replace />;
  return children;
};

// Protected Route for Admin
const AdminProtectedRoute = ({ children }) => {
  const { token, role } = getAuth();
  if (!token || role !== "admin") return <Navigate to="/login" replace />;
  return children;
};

// Protected Route for User
const UserProtectedRoute = ({ children }) => {
  const { token, role } = getAuth();
  if (!token || role !== "user") return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
      <div className="sm:min-w-0 min-w-[300px] sm:overflow-x-visible overflow-x-auto bg-gray-100">
        <Navbar />
        <ScrollToTop/>
        <Suspense fallback={<Spinner />}>
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
            <Route path="/doctor-dashboard" element={
              <DoctorProtectedRoute>
                <DoctorDashBoard />
              </DoctorProtectedRoute>
            } />
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
            <Route path="/test" element={<Test/>}/>
            <Route path="/opds" element={<OPDBookingApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        {/* Floating ChatBot widget */}
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
          <ChatBot />
        </div>
      </div>
    
  );
}

export default App;