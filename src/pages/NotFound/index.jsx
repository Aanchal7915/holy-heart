import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 className="text-5xl font-bold text-blue-900 mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
    <p className="text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
    <Link
      to="/"
      className="bg-blue-900 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
    >
      Go to Home
    </Link>
  </div>
);

export default NotFound;