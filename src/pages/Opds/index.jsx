import React, { useEffect, useState, useMemo } from 'react';
import { IoMdRefresh } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

// Helper functions
function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
function addDays(date, days) {
  const nd = new Date(date);
  nd.setDate(nd.getDate() + days);
  return nd;
}
function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function CancelModal({ open, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-2 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">Cancel Appointment</h3>
        <div className="mb-4 text-sm text-gray-700 text-center">
          Are you sure you want to cancel this OPDS appointment?
        </div>
        <div className="flex gap-2 justify-center">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Yes, Cancel
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            No, Keep
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OPDBookingApp() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [calendarRangeDays] = useState(14);
  const [selectedDate, setSelectedDate] = useState(toISODate(new Date()));
  const [schedule, setSchedule] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const [bookingModal, setBookingModal] = useState({ open: false, slot: null });
  const [patientInfo, setPatientInfo] = useState({ name: '', phone: '', email: '' });
  const [userAppointments, setUserAppointments] = useState([]);
  const [cancelModal, setCancelModal] = useState({ open: false, appointmentId: null });

  // Check if user is logged in
  const token = localStorage.getItem("token");

  // Fetch doctors from backend
  useEffect(() => {
    setLoadingDoctors(true);
    fetch(`${backendUrl}/opds/doctor`)
      .then(res => res.json())
      .then(data => {
        setDoctors(data.doctors || []);
        if (data.doctors?.length) {
          setSelectedDoctorId(data.doctors[0].id);
        }
        setLoadingDoctors(false);
      })
      .catch(() => {
        setError("Failed to load doctors.");
        setLoadingDoctors(false);
      });
  }, []);

  // Fetch schedule for selected doctor
  useEffect(() => {
    if (!selectedDoctorId) return;
    setLoadingSlots(true);
    fetch(`${backendUrl}/opds/${selectedDoctorId}/schedule-opd`)
      .then(res => res.json())
      .then(data => {
        setSchedule(data.schedule || []);
        setLoadingSlots(false);
      })
      .catch(() => {
        setError("Failed to load slots.");
        setLoadingSlots(false);
      });
  }, [selectedDoctorId]);

  // Fetch user's OPDS bookings if logged in
  useEffect(() => {
    if (!token) return;
    fetch(`${backendUrl}/user/opds-bookings`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUserAppointments(data.opdsBookings || []))
      .catch(() => setUserAppointments([]));
  }, [token]);

  // Get selected doctor object
  const selectedDoctor = useMemo(
    () => doctors.find(d => d.id === selectedDoctorId),
    [doctors, selectedDoctorId]
  );

  // Calendar days array
  const days = useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < calendarRangeDays; i++) {
      const d = addDays(today, i);
      arr.push({ date: toISODate(d), label: d.toDateString().slice(0, 10) });
    }
    return arr;
  }, [calendarRangeDays]);

  // Get slots for selected date from schedule
  const slots = useMemo(() => {
    const dayObj = schedule.find(s => s.date === selectedDate);
    return dayObj?.slots || [];
  }, [schedule, selectedDate]);

  function openBooking(slot) {
    setBookingModal({ open: true, slot });
    setPatientInfo({ name: '', phone: '', email: '' });
  }

  // Find serviceId for selected doctor from schedule response
  const serviceId = useMemo(() => {
    // Find from schedule response (opdsService)
    if (!schedule.length) return "";
    const firstDay = schedule[0];
    return firstDay?.opdsService?.id || "";
  }, [schedule]);

  // Updated booking function
  async function confirmBooking(slot) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to book an OPDS appointment.", { style: { fontSize: "0.85rem" } });
      return;
    }
    setActionLoading(true);
    try {
      // Parse start/end to HH:mm (24h) from ISO
      const startTime =slot.start// new Date(slot.start).toLocaleString("en-GB").split(" ")[1].slice(0,5)
      const endTime =slot.end// new Date(slot.end).toLocaleString("en-GB").split(" ")[1].slice(0,5)

      const res = await fetch(`${backendUrl}/opds/book-opd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: selectedDoctorId,
          serviceId,
          date: selectedDate,
          start: startTime,
          end: endTime,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        toast.success(data.message || "Appointment booked!", { style: { fontSize: "0.85rem" } });
        setUserAppointments(prev => [...prev, data.appointment]);
        setBookingModal({ open: false, slot: null });
        // Refetch schedule to update slot status
        fetch(`${backendUrl}/opds/${selectedDoctorId}/schedule-opd`)
          .then(res => res.json())
          .then(data => setSchedule(data.schedule || []));
      } else {
        toast.error(data.error || "Booking failed", { style: { fontSize: "0.85rem" } });
      }
    } catch (err) {
      console.log("error",err)
      toast.error("Failed to book OPDS appointment", { style: { fontSize: "0.85rem" } });
    }
    setActionLoading(false);
  }

  // Updated cancel API for OPDS appointment
  async function handleCancelConfirm() {
    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${backendUrl}/user/cancel-opds/${cancelModal.appointmentId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserAppointments(prev => prev.filter(a => a._id !== cancelModal.appointmentId));
      setCancelModal({ open: false, appointmentId: null });
      // Optionally refetch schedule if needed
      fetch(`${backendUrl}/opds/${selectedDoctorId}/schedule-opd`)
        .then(res => res.json())
        .then(data => setSchedule(data.schedule || []));
    } catch {
      setError("Failed to cancel appointment.");
      toast.error("Failed to cancel appointment.", { style: { fontSize: "0.85rem" } });
      setCancelModal({ open: false, appointmentId: null });
    }
    setActionLoading(false);
  }

  // Replace with real reschedule API
  async function rescheduleAppointment(appointmentId, newDate, newStart, newEnd) {
    setActionLoading(true);
    try {
      await fetch(`${backendUrl}/opds/appointment/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDate, start: newStart, end: newEnd })
      });
      setUserAppointments(prev =>
        prev.map(a =>
          a.appointmentId === appointmentId
            ? { ...a, date: newDate, start: newStart, end: newEnd }
            : a
        )
      );
      // Refetch schedule to update slot status
      fetch(`${backendUrl}/opds/${selectedDoctorId}/schedule-opd`)
        .then(res => res.json())
        .then(data => setSchedule(data.schedule || []));
    } catch {
      setError("Failed to reschedule appointment.");
    }
    setActionLoading(false);
  }

  // Individual refresh handlers
  const refreshDoctors = () => {
    setLoadingDoctors(true);
    setError(null);
    fetch(`${backendUrl}/opds/doctor`)
      .then(res => res.json())
      .then(data => {
        setDoctors(data.doctors || []);
        if (data.doctors?.length) {
          setSelectedDoctorId(data.doctors[0].id);
        }
        setLoadingDoctors(false);
      })
      .catch(() => {
        setError("Failed to load doctors.");
        setLoadingDoctors(false);
      });
  };

  const refreshSchedule = () => {
    if (!selectedDoctorId) return;
    setLoadingSlots(true);
    setError(null);
    fetch(`${backendUrl}/opds/${selectedDoctorId}/schedule-opd`)
      .then(res => res.json())
      .then(data => {
        setSchedule(data.schedule || []);
        setLoadingSlots(false);
      })
      .catch(() => {
        setError("Failed to load slots.");
        setLoadingSlots(false);
      });
  };

  const refreshAppointments = () => {
    if (!token) return;
    fetch(`${backendUrl}/user/opds-bookings`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUserAppointments(data.opdsBookings || []))
      .catch(() => setUserAppointments([]));
  };

  // Refresh handler
  const handleRefresh = () => {
    setLoadingDoctors(true);
    setLoadingSlots(true);
    setError(null);
    fetch(`${backendUrl}/opds/doctor`)
      .then(res => res.json())
      .then(data => {
        setDoctors(data.doctors || []);
        if (data.doctors?.length) {
          setSelectedDoctorId(data.doctors[0].id);
        }
        setLoadingDoctors(false);
        // Fetch schedule for first doctor
        if (data.doctors?.length) {
          fetch(`${backendUrl}/opds/${data.doctors[0].id}/schedule-opd`)
            .then(res => res.json())
            .then(data => {
              setSchedule(data.schedule || []);
              setLoadingSlots(false);
            })
            .catch(() => {
              setError("Failed to load slots.");
              setLoadingSlots(false);
            });
        } else {
          setSchedule([]);
          setLoadingSlots(false);
        }
      })
      .catch(() => {
        setError("Failed to load doctors.");
        setLoadingDoctors(false);
        setLoadingSlots(false);
      });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={2500} />
      <div className='h-[100px]'></div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">OPD Appointment Booking</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Doctors list */}
        <section className="md:col-span-1 bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-medium">Doctors</h2>
            <button
              className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
              onClick={refreshDoctors}
              title="Refresh Doctors"
              disabled={loadingDoctors}
            >
              <IoMdRefresh className={`text-xl text-blue-900 ${loadingDoctors ? "animate-spin" : ""}`} />
            </button>
          </div>
          {loadingDoctors ? (
            <div className="text-sm">Loading doctors...</div>
          ) : error ? (
            <div className="text-red-600 text-sm">{error}</div>
          ) : (
            <div className="space-y-3">
              {doctors.map(doc => (
                <div key={doc.id} className={`flex items-center gap-3 p-2 rounded cursor-pointer border ${selectedDoctorId === doc.id ? 'border-blue-400 bg-blue-50' : 'border-transparent hover:bg-gray-50'}`} onClick={() => { setSelectedDoctorId(doc.id); setSelectedDate(toISODate(new Date())); }}>
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                    {doc.image ? (
                      <img src={doc.image} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      doc.name.split(' ').map(n => n[0]).slice(0, 2).join('')
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-gray-500">{doc.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Middle: Calendar & slots */}
        <section className="md:col-span-2 bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="font-medium">{selectedDoctor ? `${selectedDoctor.name}` : 'Select a doctor'}</h2>
              <div className="text-sm text-gray-500">Pick a date and a time slot</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-sm text-gray-600">Selected date:</div>
              <div className="px-3 py-1 border rounded">{selectedDate}</div>
              <button
                className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 ml-2"
                onClick={refreshSchedule}
                title="Refresh Slots"
                disabled={loadingSlots}
              >
                <IoMdRefresh className={`text-xl text-blue-900 ${loadingSlots ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Calendar strip */}
          <div className="mt-4 overflow-x-auto">
            <div className="flex gap-2 w-max">
              {schedule.map(d => (
                <button key={d.date} onClick={() => setSelectedDate(d.date)} className={`min-w-[96px] p-3 rounded-lg border ${selectedDate === d.date ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-gray-50'}`}>
                  <div className="text-sm text-gray-500">{d.day}</div>
                  <div className="font-medium">{d.date}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Slots area */}
          <div className="mt-6">
            {loadingSlots ? (
              <div>Loading available slots...</div>
            ) : (
              <div>
                {slots.length === 0 ? (
                  <div className="text-sm text-gray-500">No slots available for this date.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {slots.map((s, idx) => (
                      <div key={idx} className={`p-3 rounded-lg border ${s.status === 'free' ? 'cursor-pointer hover:bg-green-50 border-green-100' : 'bg-red-50 border-red-100 opacity-80'}`}>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{s.start} - {s.end}</div>
                          <div className="text-xs text-gray-600">{s.status === 'free' ? 'Available' : 'Booked'}</div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          {s.status === 'free' ? (
                            <button onClick={() => openBooking(s)} className="flex-1 py-1 px-2 rounded bg-blue-600 text-white text-sm">Book</button>
                          ) : (
                            <button disabled className="flex-1 py-1 px-2 rounded bg-gray-200 text-sm">Booked</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-4">
            {error && <div className="text-red-600">{error}</div>}
            {actionLoading && <div className="text-sm text-gray-600">Processing...</div>}
          </div>
        </section>
      </div>

      {/* User's appointments summary */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Your appointments</h3>
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            onClick={refreshAppointments}
            title="Refresh Appointments"
            disabled={!token}
          >
            <IoMdRefresh className="text-xl text-blue-900" />
          </button>
        </div>
        {!token ? (
          <div className="text-sm text-gray-500">Please login to view your upcoming appointments.</div>
        ) : userAppointments.length === 0 ? (
          <div className="text-sm text-gray-500">No upcoming appointments</div>
        ) : (
          <div className="space-y-3">
            {userAppointments.map(a => (
              <div key={a._id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <div className="font-medium">
                    {a.doctor?.name || "Doctor"} — {a.start ? new Date(a.start)?.toLocaleDateString() : ""} {a.start ?`${a.start.split('T')[0]} ${a.start.split('T')[1].slice(0,5)}` : ""} - {a.end ? `${a.end.split('T')[0]} ${a.end.split('T')[1].slice(0,5)}`: ""}
                  </div>
                  <div className="text-sm text-gray-500">
                    Doctor Email: {a.doctor?.email || "-"} | Phone: {a.doctor?.phoneNu || "-"}
                  </div>
                  <div className="text-sm text-gray-500">Status: {a.status}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCancelModal({ open: true, appointmentId: a._id })}
                    className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Booking Modal */}
      {bookingModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-lg p-6">
            <h3 className="text-lg font-medium mb-3">Confirm Booking</h3>
            <div className="mb-3">Doctor: <strong>{selectedDoctor?.name}</strong></div>
            {/* <div className="mb-3">Date & Time: <strong>{selectedDate} {formatTime(bookingModal.slot.start)} - {formatTime(bookingModal.slot.end)}</strong></div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <input placeholder="Your name" value={patientInfo.name} onChange={e => setPatientInfo(p => ({ ...p, name: e.target.value }))} className="p-2 border rounded" />
              <input placeholder="Phone" value={patientInfo.phone} onChange={e => setPatientInfo(p => ({ ...p, phone: e.target.value }))} className="p-2 border rounded" />
              <input placeholder="Email (optional)" value={patientInfo.email} onChange={e => setPatientInfo(p => ({ ...p, email: e.target.value }))} className="p-2 border rounded sm:col-span-2" />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setBookingModal({ open: false, slot: null })} className="px-4 py-2 border rounded">Close</button>
              <button onClick={() => confirmBooking(bookingModal.slot)} disabled={actionLoading || !patientInfo.name || !patientInfo.phone} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60">{actionLoading ? 'Booking...' : 'Confirm'}</button>
            </div>
          </div>
        </div>
      )}
      {/* Cancel Modal */}
      <CancelModal
        open={cancelModal.open}
        onClose={() => setCancelModal({ open: false, appointmentId: null })}
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
}
