import React, { useEffect, useState, useMemo } from 'react';
import { IoMdRefresh } from "react-icons/io";

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

  // Replace with real booking API
  async function confirmBooking(slot) {
    setActionLoading(true);
    try {
      // Example booking API call
      const res = await fetch(`${backendUrl}/opds/${selectedDoctorId}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          start: slot.start,
          end: slot.end,
          patient: patientInfo
        })
      });
      if (!res.ok) throw new Error("Booking failed");
      const data = await res.json();
      setUserAppointments(prev => [...prev, data]);
      setBookingModal({ open: false, slot: null });
      // Refetch schedule to update slot status
      fetch(`${backendUrl}/opds/${selectedDoctorId}/schedule-opd`)
        .then(res => res.json())
        .then(data => setSchedule(data.schedule || []));
    } catch (err) {
      setError(err.message || "Booking failed");
    }
    setActionLoading(false);
  }

  // Replace with real cancel API
  async function cancelAppointment(appointmentId) {
    if (!window.confirm('Cancel this appointment?')) return;
    setActionLoading(true);
    try {
      await fetch(`${backendUrl}/opds/appointment/${appointmentId}`, { method: "DELETE" });
      setUserAppointments(prev => prev.filter(a => a.appointmentId !== appointmentId));
      // Refetch schedule to update slot status
      fetch(`${backendUrl}/opds/${selectedDoctorId}/schedule-opd`)
        .then(res => res.json())
        .then(data => setSchedule(data.schedule || []));
    } catch {
      setError("Failed to cancel appointment.");
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
      <div className='h-[100px]'></div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">OPD Appointment Booking</h1>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          onClick={handleRefresh}
          title="Refresh"
          disabled={loadingDoctors || loadingSlots}
        >
          <IoMdRefresh className={`text-2xl text-blue-900 ${loadingDoctors || loadingSlots ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Doctors list */}
        <section className="md:col-span-1 bg-white rounded-lg shadow p-4">
          <h2 className="font-medium mb-2">Doctors</h2>
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
                          <div className="font-medium">{formatTime(s.start)} - {formatTime(s.end)}</div>
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
        <h3 className="font-medium mb-2">Your appointments</h3>
        {userAppointments.length === 0 ? (
          <div className="text-sm text-gray-500">No upcoming appointments</div>
        ) : (
          <div className="space-y-3">
            {userAppointments.map(a => (
              <div key={a.appointmentId} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <div className="font-medium">{selectedDoctor ? selectedDoctor.name : ''} — {a.date} {formatTime(a.start)} - {formatTime(a.end)}</div>
                  <div className="text-sm text-gray-500">ID: {a.appointmentId}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const nd = prompt('New date (YYYY-MM-DD)');
                      const ns = prompt('New start time (ISO)');
                      const ne = prompt('New end time (ISO)');
                      if (nd && ns && ne) rescheduleAppointment(a.appointmentId, nd, ns, ne);
                    }}
                    className="px-3 py-1 rounded border text-sm"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => cancelAppointment(a.appointmentId)}
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
            <div className="mb-3">Date & Time: <strong>{selectedDate} {formatTime(bookingModal.slot.start)} - {formatTime(bookingModal.slot.end)}</strong></div>
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
    </div>
  );
}
