import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Calendar, Clipboard, Clock, User, MapPin, Phone, Mail, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SpinnerInBtn = () => (
  <svg
    className="animate-spin h-5 w-5 text-white inline-block mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8z"
    ></path>
  </svg>
);

// Calendar Component
const CalendarComponent = ({ selectedDate, onDateSelect, availableDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const isDateAvailable = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availableDates.includes(dateStr);
  };
  
  const isDateSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };
  
  const isDatePast = (date) => {
    return date < today.setHours(0, 0, 0, 0);
  };
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(year, month - 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(year, month + 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const isAvailable = isDateAvailable(date);
          const isSelected = isDateSelected(date);
          const isPast = isDatePast(date);
          
          return (
            <button
              key={index}
              onClick={() => isAvailable && !isPast && onDateSelect(date)}
              disabled={!isAvailable || isPast}
              className={`
                p-2 text-sm rounded-lg transition-colors
                ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                ${!isAvailable && !isPast ? 'text-gray-400 cursor-not-allowed' : ''}
                ${isAvailable && !isPast && !isSelected ? 'hover:bg-blue-50 text-gray-700' : ''}
                ${isSelected ? 'bg-blue-600 text-white' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Time Slot Component
const TimeSlotSelector = ({ selectedTime, onTimeSelect, availableSlots, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading slots...</span>
        </div>
      </div>
    );
  }
  
  if (!availableSlots || availableSlots.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>No available slots for the selected date</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {availableSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => onTimeSelect(slot)}
            className={`
              p-3 rounded-lg border-2 transition-all text-sm font-medium
              ${slot.available 
                ? 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700' 
                : 'border-red-200 bg-red-50 text-red-600 cursor-not-allowed'
              }
              ${selectedTime && selectedTime.time === slot.time 
                ? 'border-blue-600 bg-blue-600 text-white' 
                : ''
              }
            `}
            disabled={!slot.available}
          >
            <div className="flex items-center justify-center">
              <Clock className="w-4 h-4 mr-1" />
              {slot.time}
            </div>
            {!slot.available && (
              <div className="text-xs mt-1">Booked</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Doctor Card Component
const DoctorCard = ({ doctor, isSelected, onSelect }) => {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all border-2
        ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
      `}
      onClick={() => onSelect(doctor)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {doctor.image ? (
            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-blue-600 font-medium">{doctor.specialization}</p>
          <p className="text-gray-600 text-sm mt-1">{doctor.qualification}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {doctor.experience} experience
          </div>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {doctor.location}
          </div>
          {doctor.consultationFee && (
            <div className="mt-2">
              <span className="text-lg font-bold text-green-600">₹{doctor.consultationFee}</span>
              <span className="text-gray-500 text-sm ml-1">consultation</span>
            </div>
          )}
        </div>
        {isSelected && (
          <CheckCircle className="w-6 h-6 text-blue-600" />
        )}
      </div>
    </div>
  );
};

const BookAppointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState("idle");
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [serviceType, setServiceType] = useState("treatment");
  const [appointmentDetails, setAppointmentDetails] = useState({
    message: "",
    patientName: "",
    patientPhone: "",
    patientEmail: ""
  });
  const [conflictAlert, setConflictAlert] = useState(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

  // Fetch services and doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [servicesRes, doctorsRes] = await Promise.all([
          fetch(`${backendUrl}/services`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }),
          fetch(`${backendUrl}/doctors`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          })
        ]);
        
        const [servicesData, doctorsData] = await Promise.all([
          servicesRes.json(),
          doctorsRes.json()
        ]);
        
        setServices(servicesData.services || []);
        setDoctors(doctorsData.doctors || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please refresh the page.");
      }
    };
    fetchData();
  }, [backendUrl]);

  // Protect route: redirect to login if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // Fetch available dates when doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      fetchAvailableDates();
    }
  }, [selectedDoctor]);

  // Fetch available slots when date is selected
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDoctor, selectedDate]);

  const fetchAvailableDates = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${backendUrl}/doctors/${selectedDoctor._id}/available-dates`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const data = await response.json();
      setAvailableDates(data.availableDates || []);
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };

  const fetchAvailableSlots = async () => {
    setSlotsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const dateStr = selectedDate.toISOString().split('T')[0];
      const response = await fetch(
        `${backendUrl}/doctors/${selectedDoctor._id}/slots/${dateStr}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const data = await response.json();
      setAvailableSlots(data.slots || []);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setError("Failed to load available slots");
    }
    setSlotsLoading(false);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setCurrentStep(3);
  };

  const handleTimeSelect = (slot) => {
    if (!slot.available) {
      setConflictAlert({
        message: "This slot is already booked",
        nextAvailable: findNextAvailableSlot(slot)
      });
      return;
    }
    setSelectedTime(slot);
    setConflictAlert(null);
    setCurrentStep(4);
  };

  const findNextAvailableSlot = (currentSlot) => {
    const currentIndex = availableSlots.findIndex(slot => slot.time === currentSlot.time);
    for (let i = currentIndex + 1; i < availableSlots.length; i++) {
      if (availableSlots[i].available) {
        return availableSlots[i];
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setApiStatus("loading");

    const payload = {
      doctorId: selectedDoctor._id,
      appointmentDate: selectedDate.toISOString().split('T')[0],
      appointmentTime: selectedTime.time,
      message: appointmentDetails.message || "N/A",
      patientName: appointmentDetails.patientName,
      patientPhone: appointmentDetails.patientPhone,
      patientEmail: appointmentDetails.patientEmail
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${backendUrl}/appointments/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Appointment booked successfully!");
        setTimeout(() => {
          const role = localStorage.getItem("role");
          if (role === "admin") navigate("/admin-dashboard");
          else navigate("/user-dashboard");
        }, 1500);
      } else {
        const data = await response.json();
        setError(data?.error || data?.message || "Failed to book appointment. Please try again.");
        setTimeout(() => setError(""), 8000);
      }
    } catch (error) {
      setError("Error booking appointment. Please check your connection.");
      setTimeout(() => setError(""), 3000);
    }
    setApiStatus("idle");
  };

  const filteredServices = services.filter(
    (s) => s.status === "active" && s.type === serviceType
  );

  const filteredDoctors = doctors.filter(doctor => 
    doctor.status === "active" && 
    doctor.services && 
    doctor.services.some(service => 
      filteredServices.some(s => s._id === service.serviceId)
    )
  );

  return (
    <motion.section
      className="bg-gray-50 min-h-screen py-12 px-6 md:px-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="h-[50px]"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Book OPD Appointment
          </h2>
          <div className="bg-red-500 h-[5px] w-[100px] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule your consultation with our experienced doctors. 
            Choose your preferred doctor, date, and time slot for a seamless booking experience.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    ${currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-300 text-gray-600'
                    }
                  `}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`
                      w-16 h-1 mx-2
                      ${currentStep > step ? 'bg-blue-600' : 'bg-gray-300'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Labels */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-16 text-sm text-gray-600">
            <span className={currentStep >= 1 ? 'text-blue-600 font-semibold' : ''}>Select Doctor</span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-semibold' : ''}>Choose Date</span>
            <span className={currentStep >= 3 ? 'text-blue-600 font-semibold' : ''}>Pick Time</span>
            <span className={currentStep >= 4 ? 'text-blue-600 font-semibold' : ''}>Confirm</span>
          </div>
        </div>

        {/* Service Type Switch */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            type="button"
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              serviceType === "treatment"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
            }`}
            onClick={() => setServiceType("treatment")}
          >
            Treatment
          </button>
          <button
            type="button"
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              serviceType === "test"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
            }`}
            onClick={() => setServiceType("test")}
          >
            Diagnostic Test
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Steps */}
          <div className="space-y-6">
            {/* Step 1: Doctor Selection */}
            {currentStep >= 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Select Doctor
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredDoctors.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>No doctors available for {serviceType}</p>
                    </div>
                  ) : (
                    filteredDoctors.map((doctor) => (
                      <DoctorCard
                        key={doctor._id}
                        doctor={doctor}
                        isSelected={selectedDoctor && selectedDoctor._id === doctor._id}
                        onSelect={handleDoctorSelect}
                      />
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {currentStep >= 2 && selectedDoctor && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Select Date
                </h3>
                <CalendarComponent
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  availableDates={availableDates}
                />
              </div>
            )}

            {/* Step 3: Time Selection */}
            {currentStep >= 3 && selectedDoctor && selectedDate && (
              <div>
                <TimeSlotSelector
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                  availableSlots={availableSlots}
                  loading={slotsLoading}
                />
                
                {/* Conflict Alert */}
                {conflictAlert && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
                      <div className="flex-1">
                        <p className="text-red-800 font-medium">{conflictAlert.message}</p>
                        {conflictAlert.nextAvailable && (
                          <p className="text-red-600 text-sm mt-1">
                            Next available slot: {conflictAlert.nextAvailable.time}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setConflictAlert(null)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Appointment Details */}
            {currentStep >= 4 && selectedDoctor && selectedDate && selectedTime && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clipboard className="w-5 h-5 mr-2 text-blue-600" />
                  Appointment Details
                </h3>
                
                {/* Appointment Summary */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-800 mb-2">Appointment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium">{selectedDoctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTime.time}</span>
                    </div>
                    {selectedDoctor.consultationFee && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fee:</span>
                        <span className="font-medium text-green-600">₹{selectedDoctor.consultationFee}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Patient Details Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={appointmentDetails.patientName}
                      onChange={(e) => setAppointmentDetails(prev => ({
                        ...prev,
                        patientName: e.target.value
                      }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter patient's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={appointmentDetails.patientPhone}
                      onChange={(e) => setAppointmentDetails(prev => ({
                        ...prev,
                        patientPhone: e.target.value
                      }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={appointmentDetails.patientEmail}
                      onChange={(e) => setAppointmentDetails(prev => ({
                        ...prev,
                        patientEmail: e.target.value
                      }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Symptoms / Message (Optional)
                    </label>
                    <textarea
                      value={appointmentDetails.message}
                      onChange={(e) => setAppointmentDetails(prev => ({
                        ...prev,
                        message: e.target.value
                      }))}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your symptoms or any additional information"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center"
                    disabled={apiStatus === "loading"}
                  >
                    {apiStatus === "loading" && <SpinnerInBtn />}
                    Confirm Appointment
                  </button>

                  {/* Error Message */}
                  {error && (
                    <div className="text-sm text-red-600 mt-2 text-center bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Right Column - Selected Doctor Info */}
          {selectedDoctor && (
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Selected Doctor</h3>
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {selectedDoctor.image ? (
                      <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">{selectedDoctor.name}</h4>
                    <p className="text-blue-600 font-medium">{selectedDoctor.specialization}</p>
                    <p className="text-gray-600 text-sm mt-1">{selectedDoctor.qualification}</p>
                    
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {selectedDoctor.experience} experience
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {selectedDoctor.location}
                      </div>
                      {selectedDoctor.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {selectedDoctor.phone}
                        </div>
                      )}
                      {selectedDoctor.email && (
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {selectedDoctor.email}
                        </div>
                      )}
                    </div>

                    {selectedDoctor.consultationFee && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600">Consultation Fee</div>
                        <div className="text-2xl font-bold text-green-600">₹{selectedDoctor.consultationFee}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep > 1 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default BookAppointment;
