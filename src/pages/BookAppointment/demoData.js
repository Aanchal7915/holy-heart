// Demo data for testing the OPD booking interface
// This file contains sample data that can be used for development and testing

export const demoDoctors = [
  {
    _id: "doctor_1",
    name: "Dr. Rajesh Kumar Sharma",
    specialization: "Cardiology",
    qualification: "MD (Medicine), DM (Cardiology)",
    experience: "15+ Years",
    location: "Main Hospital, Floor 2",
    phone: "+91-9876543210",
    email: "rajesh.sharma@holyheart.com",
    image: "/assets/doctor/doctor1.jpg",
    consultationFee: 800,
    status: "active",
    services: [
      {
        serviceId: "service_1",
        chargePerAppointment: 800
      },
      {
        serviceId: "service_2",
        chargePerAppointment: 800
      }
    ]
  },
  {
    _id: "doctor_2",
    name: "Dr. Priya Singh",
    specialization: "Pediatric Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "12+ Years",
    location: "Main Hospital, Floor 1",
    phone: "+91-9876543211",
    email: "priya.singh@holyheart.com",
    image: "/assets/doctor/doctor2.jpg",
    consultationFee: 600,
    status: "active",
    services: [
      {
        serviceId: "service_3",
        chargePerAppointment: 600
      }
    ]
  },
  {
    _id: "doctor_3",
    name: "Dr. Amit Kumar",
    specialization: "General Medicine",
    qualification: "MBBS, MD (Medicine)",
    experience: "8+ Years",
    location: "Main Hospital, Ground Floor",
    phone: "+91-9876543212",
    email: "amit.kumar@holyheart.com",
    image: "/assets/doctor/doctor3.jpg",
    consultationFee: 500,
    status: "active",
    services: [
      {
        serviceId: "service_4",
        chargePerAppointment: 500
      },
      {
        serviceId: "service_5",
        chargePerAppointment: 500
      }
    ]
  },
  {
    _id: "doctor_4",
    name: "Dr. Sunita Gupta",
    specialization: "Neurology",
    qualification: "MBBS, MD (Medicine), DM (Neurology)",
    experience: "10+ Years",
    location: "Main Hospital, Floor 3",
    phone: "+91-9876543213",
    email: "sunita.gupta@holyheart.com",
    image: "/assets/doctor/doctor4.jpg",
    consultationFee: 700,
    status: "active",
    services: [
      {
        serviceId: "service_6",
        chargePerAppointment: 700
      }
    ]
  }
];

export const demoServices = [
  {
    _id: "service_1",
    name: "Cardiac Consultation",
    type: "treatment",
    status: "active",
    price: 800,
    description: "Comprehensive cardiac evaluation and consultation"
  },
  {
    _id: "service_2",
    name: "ECG Test",
    type: "test",
    status: "active",
    price: 200,
    description: "Electrocardiogram test for heart rhythm analysis"
  },
  {
    _id: "service_3",
    name: "Pediatric Heart Checkup",
    type: "treatment",
    status: "active",
    price: 600,
    description: "Specialized heart checkup for children"
  },
  {
    _id: "service_4",
    name: "General Health Checkup",
    type: "treatment",
    status: "active",
    price: 500,
    description: "Comprehensive general health examination"
  },
  {
    _id: "service_5",
    name: "Blood Test",
    type: "test",
    status: "active",
    price: 300,
    description: "Complete blood count and basic blood tests"
  },
  {
    _id: "service_6",
    name: "Neurological Consultation",
    type: "treatment",
    status: "active",
    price: 700,
    description: "Specialized neurological examination and consultation"
  }
];

export const demoAvailableDates = [
  "2024-01-15",
  "2024-01-16",
  "2024-01-17",
  "2024-01-18",
  "2024-01-19",
  "2024-01-20",
  "2024-01-22",
  "2024-01-23",
  "2024-01-24",
  "2024-01-25",
  "2024-01-26",
  "2024-01-27",
  "2024-01-29",
  "2024-01-30",
  "2024-01-31"
];

export const demoTimeSlots = [
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: false },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: false },
  { time: "03:30 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: false },
  { time: "05:00 PM", available: true }
];

export const demoAppointments = [
  {
    _id: "appointment_1",
    doctor: {
      name: "Dr. Rajesh Kumar Sharma",
      specialization: "Cardiology"
    },
    appointmentDate: "2024-01-15",
    appointmentTime: "10:00 AM",
    status: "confirmed",
    message: "Chest pain and shortness of breath",
    patientName: "John Doe",
    patientPhone: "+91-9876543210",
    patientEmail: "john.doe@email.com"
  },
  {
    _id: "appointment_2",
    doctor: {
      name: "Dr. Priya Singh",
      specialization: "Pediatric Cardiology"
    },
    appointmentDate: "2024-01-16",
    appointmentTime: "02:30 PM",
    status: "pending",
    message: "Regular checkup for 8-year-old child",
    patientName: "Jane Smith",
    patientPhone: "+91-9876543211",
    patientEmail: "jane.smith@email.com"
  },
  {
    _id: "appointment_3",
    doctor: {
      name: "Dr. Amit Kumar",
      specialization: "General Medicine"
    },
    appointmentDate: "2024-01-10",
    appointmentTime: "11:00 AM",
    status: "completed",
    message: "Fever and cold symptoms",
    patientName: "Mike Johnson",
    patientPhone: "+91-9876543212",
    patientEmail: "mike.johnson@email.com"
  }
];

// Helper function to generate available dates for the next 30 days
export const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip Sundays (assuming hospital is closed on Sundays)
    if (date.getDay() !== 0) {
      dates.push(date.toISOString().split('T')[0]);
    }
  }
  
  return dates;
};

// Helper function to generate time slots with random availability
export const generateTimeSlots = () => {
  const slots = [];
  const times = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM"
  ];
  
  times.forEach(time => {
    slots.push({
      time,
      available: Math.random() > 0.3 // 70% chance of being available
    });
  });
  
  return slots;
};

// Mock API responses for development
export const mockApiResponses = {
  getDoctors: () => ({
    doctors: demoDoctors
  }),
  
  getServices: () => ({
    services: demoServices
  }),
  
  getAvailableDates: (doctorId) => ({
    availableDates: demoAvailableDates
  }),
  
  getTimeSlots: (doctorId, date) => ({
    slots: demoTimeSlots
  }),
  
  bookAppointment: (appointmentData) => ({
    success: true,
    appointmentId: `appointment_${Date.now()}`,
    message: "Appointment booked successfully"
  }),
  
  getUserAppointments: () => ({
    appointments: demoAppointments
  }),
  
  rescheduleAppointment: (appointmentId, newData) => ({
    success: true,
    message: "Appointment rescheduled successfully"
  }),
  
  cancelAppointment: (appointmentId) => ({
    success: true,
    message: "Appointment cancelled successfully"
  })
};

// Development mode flag
export const isDevelopmentMode = import.meta.env.DEV;

// Use demo data in development mode
export const useDemoData = () => {
  if (isDevelopmentMode) {
    return {
      doctors: demoDoctors,
      services: demoServices,
      availableDates: demoAvailableDates,
      timeSlots: demoTimeSlots,
      appointments: demoAppointments
    };
  }
  return null;
};
