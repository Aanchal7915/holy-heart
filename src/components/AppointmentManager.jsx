import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, Edit, Trash2, AlertCircle, CheckCircle, X } from 'lucide-react';
import { toast } from 'react-toastify';

const AppointmentManager = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    newDate: '',
    newTime: ''
  });

  const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

  useEffect(() => {
    fetchAppointments();
  }, [userId]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${backendUrl}/appointments/user`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    }
    setLoading(false);
  };

  const handleReschedule = async () => {
    if (!rescheduleData.newDate || !rescheduleData.newTime) {
      toast.error("Please select both date and time");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${backendUrl}/appointments/${selectedAppointment._id}/reschedule`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newDate: rescheduleData.newDate,
            newTime: rescheduleData.newTime,
          }),
        }
      );

      if (response.ok) {
        toast.success("Appointment rescheduled successfully!");
        setShowRescheduleModal(false);
        setSelectedAppointment(null);
        setRescheduleData({ newDate: '', newTime: '' });
        fetchAppointments();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to reschedule appointment");
      }
    } catch (error) {
      toast.error("Error rescheduling appointment");
    }
  };

  const handleCancel = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${backendUrl}/appointments/${selectedAppointment._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Appointment cancelled successfully!");
        setShowCancelModal(false);
        setSelectedAppointment(null);
        fetchAppointments();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to cancel appointment");
      }
    } catch (error) {
      toast.error("Error cancelling appointment");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading appointments...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My Appointments</h2>
        <button
          onClick={fetchAppointments}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Appointments Found</h3>
          <p className="text-gray-500">You haven't booked any appointments yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {appointment.doctor?.name || 'Dr. Unknown'}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {getStatusIcon(appointment.status)}
                      <span className="ml-1 capitalize">{appointment.status}</span>
                    </span>
                  </div>

                  <p className="text-blue-600 font-medium mb-2">
                    {appointment.doctor?.specialization || 'Specialization not available'}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {appointment.appointmentTime}
                    </div>
                    {appointment.patientName && (
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {appointment.patientName}
                      </div>
                    )}
                    {appointment.patientPhone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {appointment.patientPhone}
                      </div>
                    )}
                  </div>

                  {appointment.message && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Message:</strong> {appointment.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  {appointment.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowRescheduleModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Reschedule"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowCancelModal(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Cancel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Reschedule Appointment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Date
                </label>
                <input
                  type="date"
                  value={rescheduleData.newDate}
                  onChange={(e) => setRescheduleData(prev => ({
                    ...prev,
                    newDate: e.target.value
                  }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Time
                </label>
                <select
                  value={rescheduleData.newTime}
                  onChange={(e) => setRescheduleData(prev => ({
                    ...prev,
                    newTime: e.target.value
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleReschedule}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Reschedule
              </button>
              <button
                onClick={() => {
                  setShowRescheduleModal(false);
                  setSelectedAppointment(null);
                  setRescheduleData({ newDate: '', newTime: '' });
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Cancel Appointment</h3>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Are you sure you want to cancel this appointment?
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">{selectedAppointment.doctor?.name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedAppointment.appointmentDate).toLocaleDateString()} at{' '}
                  {selectedAppointment.appointmentTime}
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedAppointment(null);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                No, Keep
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManager;
