import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY || "";

function formatDuration(duration) {
  const min = parseInt(duration, 10);
  if (!isNaN(min)) {
    if (min < 60) return `${min} min`;
    const hr = Math.floor(min / 60);
    const rem = min % 60;
    return rem === 0 ? `${hr} hr` : `${hr} hr ${rem} min`;
  }
  return duration;
}

function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function Test() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [razorpayLoadingId, setRazorpayLoadingId] = useState(null);
  const [paymentModal, setPaymentModal] = useState({ open: false, details: null });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch(`${backendUrl}/services?type=test`);
        const data = await res.json();
        setTests(data.services || []);
      } catch {
        setTests([]);
      }
      setLoading(false);
    };
    fetchTests();
  }, []);

  const handleBookNow = async (test) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to book a test.", { style: { fontSize: "0.85rem" } });
      navigate("/login");
      return;
    }

    setRazorpayLoadingId(test._id);

    // Load Razorpay script
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("Failed to load Razorpay. Please try again.", { style: { fontSize: "0.85rem" } });
      setRazorpayLoadingId(null);
      return;
    }

    // Create order on backend
    let orderData = {};
    let status = 0;
    try {
      const receiptRaw = `test_${test._id}_${Date.now()}`;
      const receipt = receiptRaw.length > 40 ? receiptRaw.slice(0, 40) : receiptRaw;

      const orderRes = await fetch(`${backendUrl}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: test.price * 100,
          currency: "INR",
          receipt,
          testId: test._id,
        }),
      });
      status = orderRes.status;
      orderData = await orderRes.json();
    } catch {
      toast.error("Failed to initiate payment. Please try again.", { style: { fontSize: "0.85rem" } });
      setRazorpayLoadingId(null);
      return;
    }

    if (status !== 200) {
      toast.error(orderData?.error || "Failed to create order.", { style: { fontSize: "0.85rem" } });
      setRazorpayLoadingId(null);
      return;
    }

    const { name: userName, email: userEmail, phoneNu: userPhone, testId, testName } = orderData.notes || {};

    const options = {
      key: razorpayKey,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Holy Heart Hospital",
      description: `Booking for ${testName || test.name}`,
      image: "/logo.png",
      order_id: orderData.id,
      handler: function (response) {
        setPaymentModal({
          open: true,
          details: {
            paymentId: response.razorpay_payment_id,
            orderId: orderData.id,
            receipt: orderData.receipt,
            testName: testName || test.name,
            amount: orderData.amount / 100,
            userName: userName || "",
            userEmail: userEmail || "",
            userPhone: userPhone || "",
          }
        });
        setRazorpayLoadingId(null);
      },
      prefill: {
        name: userName || "",
        email: userEmail || "",
        contact: userPhone || "",
      },
      notes: {
        testId: testId || test._id,
        testName: testName || test.name,
      },
      theme: {
        color: "#0a2540",
      },
      modal: {
        ondismiss: () => setRazorpayLoadingId(null)
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="h-[50px]"></div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Tests Provided</h2>
        <div className="bg-blue-900 h-[4px] w-[80px] mx-auto mb-8"></div>
        {loading ? (
          <div className="text-center py-12 text-blue-900 font-semibold">Loading...</div>
        ) : tests.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No tests available.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {tests.map(test => (
              <div
                key={test._id}
                className="bg-white rounded-2xl shadow-lg p-0 flex flex-col overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image at top with overlay */}
                <div className="relative">
                  {test.image ? (
                    <img
                      src={test.image}
                      alt={test.name}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-blue-50 flex items-center justify-center text-blue-300 text-5xl">
                      <span>No Image</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-900/70 to-transparent px-4 py-2">
                    <h3 className="text-xl font-bold text-white drop-shadow">{test.name}</h3>
                  </div>
                </div>
                {/* Card Content */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {test.price && (
                      <span className="bg-blue-100 text-blue-900 font-semibold px-3 py-1 rounded-full text-sm">
                        ₹{test.price}
                      </span>
                    )}
                    {test.duration && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {formatDuration(test.duration)}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-700 text-base leading-relaxed">
                    {test.description}
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold shadow transition"
                      onClick={() => handleBookNow(test)}
                      disabled={razorpayLoadingId !== null}
                    >
                      {razorpayLoadingId === test._id ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                          </svg>
                          Loading...
                        </span>
                      ) : (
                        "Book Now"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Payment Success Modal */}
      {paymentModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-600 text-xl"
              onClick={() => setPaymentModal({ open: false, details: null })}
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-4 mb-3">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h3>
              <div className="text-gray-700 mb-4 text-center">Your test booking is confirmed.</div>
              <div className="w-full bg-gray-50 rounded-lg p-4 mb-2">
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Test:</span> {paymentModal.details.testName}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Amount Paid:</span> ₹{paymentModal.details.amount}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Payment ID:</span> {paymentModal.details.paymentId}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Order ID:</span> {paymentModal.details.orderId}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Receipt:</span> {paymentModal.details.receipt}
                </div>
                {/* Removed Name, Email, Phone */}
              </div>
              <button
                className="mt-2 px-6 py-2 bg-blue-900 text-white rounded-full font-semibold shadow hover:bg-blue-700"
                onClick={() => setPaymentModal({ open: false, details: null })}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Test;