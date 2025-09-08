import React, { useEffect, useState, useMemo } from 'react';

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

// --- MOCK DATA ---
const MOCK_DOCTORS = [
  {
    id: "doc1",
    name: "Dr. Aanchal Sharma",
    designation: "Cardiologist",
    avatarUrl: "",
    opdTimings: [
      { dayOfWeek: 1, start: "09:00", end: "13:00" },
      { dayOfWeek: 3, start: "10:00", end: "14:00" }
    ],
    dailyCapacity: 20
  },
  {
    id: "doc2",
    name: "Dr. Rahul Singh",
    designation: "Neurologist",
    avatarUrl: "",
    opdTimings: [
      { dayOfWeek: 2, start: "11:00", end: "15:00" },
      { dayOfWeek: 4, start: "09:30", end: "12:30" }
    ],
    dailyCapacity: 15
  }
];

// Generate mock slots for a doctor and date
function getMockSlots(doctorId, date) {
  // Find doctor
  const doc = MOCK_DOCTORS.find(d => d.id === doctorId);
  if (!doc) return [];
  const dayOfWeek = new Date(date).getDay();
  const timing = doc.opdTimings.find(t => t.dayOfWeek === dayOfWeek);
  if (!timing) return [];
  // Generate slots every 20 min
  const slots = [];
  let [h, m] = timing.start.split(":").map(Number);
  let [eh, em] = timing.end.split(":").map(Number);
  while (h < eh || (h === eh && m <= em)) {
    const timeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    slots.push({
      time: timeStr,
      status: Math.random() < 0.2 ? "booked" : "available", // 20% booked
      appointmentId: Math.random() < 0.2 ? `apt_${doctorId}_${date}_${timeStr}` : undefined
    });
    m += 20;
    if (m >= 60) { h++; m -= 60; }
  }
  return slots;
}

export default function OPDBookingApp() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [calendarRangeDays] = useState(14);
  const [selectedDate, setSelectedDate] = useState(toISODate(new Date()));
  const [slots, setSlots] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const [bookingModal, setBookingModal] = useState({ open: false, slot: null });
  const [patientInfo, setPatientInfo] = useState({ name: '', phone: '', email: '' });
  const [userAppointments, setUserAppointments] = useState([]);

  // Use mock doctors
  useEffect(() => {
    setLoadingDoctors(true);
    setTimeout(() => {
      setDoctors(MOCK_DOCTORS);
      setSelectedDoctorId(MOCK_DOCTORS[0].id);
      setLoadingDoctors(false);
    }, 500);
  }, []);

  // Load slots (mock)
  useEffect(() => {
    if (!selectedDoctorId || !selectedDate) return;
    setLoadingSlots(true);
    setTimeout(() => {
      setSlots(getMockSlots(selectedDoctorId, selectedDate));
      setLoadingSlots(false);
    }, 400);
  }, [selectedDoctorId, selectedDate]);

  const selectedDoctor = useMemo(() => doctors.find(d => d.id === selectedDoctorId), [doctors, selectedDoctorId]);

  // calendar days array
  const days = useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < calendarRangeDays; i++) {
      const d = addDays(today, i);
      arr.push({ date: toISODate(d), label: d.toDateString().slice(0, 10) });
    }
    return arr;
  }, [calendarRangeDays]);

  function openBooking(slot) {
    setBookingModal({ open: true, slot });
    setPatientInfo({ name: '', phone: '', email: '' });
  }

  function confirmBooking(slot) {
    setActionLoading(true);
    setTimeout(() => {
      // Mock booking
      setUserAppointments(prev => [
        ...prev,
        {
          appointmentId: `apt_${selectedDoctorId}_${selectedDate}_${slot.time}`,
          doctorId: selectedDoctorId,
          date: selectedDate,
          time: slot.time,
          patient: patientInfo
        }
      ]);
      setBookingModal({ open: false, slot: null });
      setActionLoading(false);
      setSlots(slots.map(s => s.time === slot.time ? { ...s, status: "booked", appointmentId: `apt_${selectedDoctorId}_${selectedDate}_${slot.time}` } : s));
    }, 700);
  }

  function cancelAppointment(appointmentId) {
    if (!window.confirm('Cancel this appointment?')) return;
    setActionLoading(true);
    setTimeout(() => {
      setUserAppointments(prev => prev.filter(a => a.appointmentId !== appointmentId));
      setSlots(slots.map(s => s.appointmentId === appointmentId ? { ...s, status: "available", appointmentId: undefined } : s));
      setActionLoading(false);
    }, 500);
  }

  function rescheduleAppointment(appointmentId, newDate, newTime) {
    setActionLoading(true);
    setTimeout(() => {
      setUserAppointments(prev =>
        prev.map(a =>
          a.appointmentId === appointmentId
            ? { ...a, date: newDate, time: newTime }
            : a
        )
      );
      setActionLoading(false);
    }, 700);
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">OPD Appointment Booking</h1>

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
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">{doc.avatarUrl ? <img src={doc.avatarUrl} alt="avatar" className="w-12 h-12 rounded-full object-cover" /> : doc.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                  <div className="flex-1">
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-gray-500">{doc.designation}</div>
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
              <h2 className="font-medium">{selectedDoctor ? `${selectedDoctor.name} — ${selectedDoctor.designation}` : 'Select a doctor'}</h2>
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
              {days.map(d => (
                <button key={d.date} onClick={() => setSelectedDate(d.date)} className={`min-w-[96px] p-3 rounded-lg border ${selectedDate === d.date ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-gray-50'}`}>
                  <div className="text-sm text-gray-500">{new Date(d.date).toLocaleString(undefined, { weekday: 'short' })}</div>
                  <div className="font-medium">{new Date(d.date).toLocaleDateString()}</div>
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
                      <div key={idx} className={`p-3 rounded-lg border ${s.status === 'available' ? 'cursor-pointer hover:bg-green-50 border-green-100' : 'bg-red-50 border-red-100 opacity-80'}`}>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{s.time}</div>
                          <div className="text-xs text-gray-600">{s.status}</div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          {s.status === 'available' ? (
                            <button onClick={() => openBooking(s)} className="flex-1 py-1 px-2 rounded bg-blue-600 text-white text-sm">Book</button>
                          ) : (
                            <button onClick={() => { alert('Slot already booked.'); }} className="flex-1 py-1 px-2 rounded bg-gray-200 text-sm">Booked</button>
                          )}
                          {s.appointmentId && (
                            <button onClick={() => cancelAppointment(s.appointmentId)} className="py-1 px-2 rounded border text-sm">Cancel</button>
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
                  <div className="font-medium">{selectedDoctor ? selectedDoctor.name : ''} — {a.date} {a.time}</div>
                  <div className="text-sm text-gray-500">ID: {a.appointmentId}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { const nd = prompt('New date (YYYY-MM-DD)'); const nt = prompt('New time (HH:MM)'); if (nd && nt) rescheduleAppointment(a.appointmentId, nd, nt); }} className="px-3 py-1 rounded border text-sm">Reschedule</button>
                  <button onClick={() => cancelAppointment(a.appointmentId)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Cancel</button>
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
            <div className="mb-3">Date & Time: <strong>{selectedDate} {bookingModal.slot.time}</strong></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <input placeholder="Your name" value={patientInfo.name} onChange={e=>setPatientInfo(p=>({...p,name:e.target.value}))} className="p-2 border rounded" />
              <input placeholder="Phone" value={patientInfo.phone} onChange={e=>setPatientInfo(p=>({...p,phone:e.target.value}))} className="p-2 border rounded" />
              <input placeholder="Email (optional)" value={patientInfo.email} onChange={e=>setPatientInfo(p=>({...p,email:e.target.value}))} className="p-2 border rounded sm:col-span-2" />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={()=>setBookingModal({open:false,slot:null})} className="px-4 py-2 border rounded">Close</button>
              <button onClick={()=>confirmBooking(bookingModal.slot)} disabled={actionLoading || !patientInfo.name || !patientInfo.phone} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60">{actionLoading ? 'Booking...' : 'Confirm'}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
