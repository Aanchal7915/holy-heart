import React, { useEffect, useState } from "react";
import Spinner from "../../../../../components/Spinner";
import { IoMdRefresh } from "react-icons/io";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const TestAppointments = () => {
  const [bookings, setBookings] = useState([]);
  const [apiStatus, setApiStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showDetail, setShowDetail] = useState({});

  const fetchAppointments = async () => {
    setApiStatus("loading");
    setErrorMsg("");
    try {
      const params = new URLSearchParams({ limit, page });
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/test-bookings?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch test bookings");
      const data = await res.json();
      setBookings(data.bookings || []);
      setTotalPages(data.totalPages || 1);
      setApiStatus("");
    } catch (err) {
      setApiStatus("error");
      setErrorMsg(err.message || "Error fetching test bookings");
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [page, limit]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Test Bookings</h3>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          onClick={fetchAppointments}
          title="Refresh"
        >
          <IoMdRefresh className="text-xl text-blue-900" />
        </button>
      </div>
      {apiStatus === "loading" ? (
        <Spinner />
      ) : errorMsg ? (
        <div className="text-red-600">{errorMsg}</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Test</th>
              <th className="py-2 px-4">Patient</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">No test bookings found.</td>
              </tr>
            ) : (
              bookings.map(b => (
                <React.Fragment key={b._id}>
                  <tr>
                    <td className="py-2 px-4">{b.capturedAt ? new Date(b.capturedAt).toLocaleDateString() : "-"}</td>
                    <td className="py-2 px-4">{b.test?.name || "-"}</td>
                    <td className="py-2 px-4">{b.patient?.name || b.name || "-"}</td>
                    <td className="py-2 px-4">{b.amount ? `₹${b.amount}` : "-"}</td>
                    <td className="py-2 px-4">{b.status || "-"}</td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        onClick={() => setShowDetail(prev => ({ ...prev, [b._id]: !prev[b._id] }))}
                      >
                        {showDetail[b._id] ? "Hide" : "Show"} Details
                      </button>
                    </td>
                  </tr>
                  {showDetail[b._id] && (
                    <tr>
                      <td colSpan={6} className="bg-gray-50 px-4 py-3 border-t">
                        <div className="flex flex-col gap-2">
                          <div>
                            <span className="font-semibold">Test Details:</span>
                            <div className="ml-2 text-xs text-gray-700">
                              <div>Name: {b.test?.name || "-"}</div>
                              <div>Description: {b.test?.description || "-"}</div>
                              <div>ID: {b.test?._id || "-"}</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold">Patient Details:</span>
                            <div className="ml-2 text-xs text-gray-700">
                              <div>Name: {b.patient?.name || b.name || "-"}</div>
                              <div>Email: {b.patient?.email || b.email || "-"}</div>
                              <div>Phone: {b.patient?.phoneNu || b.phoneNu || "-"}</div>
                              <div>Gender: {b.gender || "-"}</div>
                              <div>ID: {b.patient?._id || "-"}</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold">Payment Details:</span>
                            <div className="ml-2 text-xs text-gray-700">
                              <div>Amount: {b.amount ? `₹${b.amount}` : "-"}</div>
                              <div>Currency: {b.currency || "-"}</div>
                              <div>Method: {b.method || "-"}</div>
                              <div>Status: {b.status || "-"}</div>
                              <div>Order ID: {b.razorpayOrderId || "-"}</div>
                              <div>Payment ID: {b.razorpayPaymentId || "-"}</div>
                              <div>Signature: {b.razorpaySignature || "-"}</div>
                              <div>UPI ID: {b.paymentDetails?.upiId || "-"}</div>
                              <div>Captured At: {b.capturedAt ? new Date(b.capturedAt).toLocaleString() : "-"}</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold">Booking Details:</span>
                            <div className="ml-2 text-xs text-gray-700">
                              <div>Created At: {b.createdAt ? new Date(b.createdAt).toLocaleString() : "-"}</div>
                              <div>Updated At: {b.updatedAt ? new Date(b.updatedAt).toLocaleString() : "-"}</div>
                              <div>Booking ID: {b._id}</div>
                            </div>
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
      )}
      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          className="px-3 py-1 rounded border"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="px-3 py-1">{page} / {totalPages}</span>
        <button
          className="px-3 py-1 rounded border"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TestAppointments;