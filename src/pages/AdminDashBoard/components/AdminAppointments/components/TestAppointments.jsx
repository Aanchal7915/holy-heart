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
  const [uploading, setUploading] = useState({});
  const [deleting, setDeleting] = useState({});

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

  // Upload PDF handler
  const handleUploadPdf = async (testId, file) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, [testId]: true }));
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/test-bookings/${testId}/upload-pdf`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to upload report");
      toast.success("Report uploaded successfully!");
      fetchAppointments();
    } catch (err) {
      toast.error(err.message || "Error uploading report");
    }
    setUploading(prev => ({ ...prev, [testId]: false }));
  };

  // Delete PDF handler
  const handleDeletePdf = async (testId, pdfUrl) => {
    setDeleting(prev => ({ ...prev, [testId]: pdfUrl }));
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/test-bookings/${testId}/delete-pdf`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pdfUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete report");
      toast.success("Report deleted successfully!");
      fetchAppointments();
    } catch (err) {
      toast.error(err.message || "Error deleting report");
    }
    setDeleting(prev => ({ ...prev, [testId]: null }));
  };

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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Test</th>
                <th className="py-2 px-4">Patient</th>
                <th className="py-2 px-4">Amount</th>
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
                            <div>
                              <span className="font-semibold">Reports:</span>
                              <div className="ml-2 text-xs text-gray-700 flex flex-col gap-2">
                                {b.reports && b.reports.length > 0 ? (
                                  b.reports.map((pdfUrl, idx) => (
                                    <div key={idx} className="flex flex-col gap-1 mb-2">
                                      <div className="flex items-center gap-2">
                                        <a
                                          href={pdfUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-700 underline"
                                        >
                                          Report {idx + 1}
                                        </a>
                                        <button
                                          className="text-red-600 text-xs px-2 py-1 border rounded hover:bg-red-50"
                                          disabled={deleting[b._id] === pdfUrl}
                                          onClick={() => handleDeletePdf(b._id, pdfUrl)}
                                        >
                                          {deleting[b._id] === pdfUrl ? "Deleting..." : "Delete"}
                                        </button>
                                      </div>
                                      {/* PDF Preview */}
                                      <div className="border rounded bg-gray-100 p-2">
                                        <iframe
                                          src={pdfUrl}
                                          title={`Report Preview ${idx + 1}`}
                                          width="100%"
                                          height="200px"
                                          style={{ border: "none" }}
                                        />
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <span className="text-gray-500">No reports uploaded.</span>
                                )}
                                <form
                                  className="flex items-center gap-2 mt-2"
                                  onSubmit={e => {
                                    e.preventDefault();
                                    const file = e.target.elements.pdf.files[0];
                                    handleUploadPdf(b._id, file);
                                    e.target.reset();
                                  }}
                                >
                                  <input
                                    type="file"
                                    name="pdf"
                                    accept="application/pdf"
                                    className="text-xs"
                                    required
                                  />
                                  <button
                                    type="submit"
                                    className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                                    disabled={uploading[b._id]}
                                  >
                                    {uploading[b._id] ? "Uploading..." : "Upload Report"}
                                  </button>
                                </form>
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
        </div>
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