# OPD Booking API Documentation

This document outlines the API endpoints required for the enhanced OPD booking interface.

## Required API Endpoints

### 1. Get All Doctors
```
GET /doctors
Headers: Authorization: Bearer <token>
Response: {
  doctors: [
    {
      _id: "doctor_id",
      name: "Dr. John Doe",
      specialization: "Cardiology",
      qualification: "MD, DM",
      experience: "10+ Years",
      location: "Main Hospital",
      phone: "+91-9876543210",
      email: "doctor@hospital.com",
      image: "doctor_image_url",
      consultationFee: 500,
      status: "active",
      services: [
        {
          serviceId: "service_id",
          chargePerAppointment: 500
        }
      ]
    }
  ]
}
```

### 2. Get Doctor Available Dates
```
GET /doctors/:doctorId/available-dates
Headers: Authorization: Bearer <token>
Response: {
  availableDates: [
    "2024-01-15",
    "2024-01-16",
    "2024-01-17"
  ]
}
```

### 3. Get Doctor Time Slots for Specific Date
```
GET /doctors/:doctorId/slots/:date
Headers: Authorization: Bearer <token>
Response: {
  slots: [
    {
      time: "09:00 AM",
      available: true
    },
    {
      time: "09:30 AM",
      available: false
    },
    {
      time: "10:00 AM",
      available: true
    }
  ]
}
```

### 4. Book Appointment
```
POST /appointments/book
Headers: 
  Authorization: Bearer <token>
  Content-Type: application/json
Body: {
  doctorId: "doctor_id",
  appointmentDate: "2024-01-15",
  appointmentTime: "09:00 AM",
  message: "Patient symptoms description",
  patientName: "Patient Name",
  patientPhone: "+91-9876543210",
  patientEmail: "patient@email.com"
}
Response: {
  success: true,
  appointmentId: "appointment_id",
  message: "Appointment booked successfully"
}
```

### 5. Reschedule Appointment
```
PUT /appointments/:appointmentId/reschedule
Headers: 
  Authorization: Bearer <token>
  Content-Type: application/json
Body: {
  newDate: "2024-01-16",
  newTime: "10:00 AM"
}
Response: {
  success: true,
  message: "Appointment rescheduled successfully"
}
```

### 6. Cancel Appointment
```
DELETE /appointments/:appointmentId
Headers: Authorization: Bearer <token>
Response: {
  success: true,
  message: "Appointment cancelled successfully"
}
```

### 7. Get User Appointments
```
GET /appointments/user
Headers: Authorization: Bearer <token>
Response: {
  appointments: [
    {
      _id: "appointment_id",
      doctor: {
        name: "Dr. John Doe",
        specialization: "Cardiology"
      },
      appointmentDate: "2024-01-15",
      appointmentTime: "09:00 AM",
      status: "confirmed",
      message: "Patient symptoms"
    }
  ]
}
```

## Error Responses

All endpoints should return appropriate error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `DOCTOR_NOT_FOUND`
- `SLOT_NOT_AVAILABLE`
- `INVALID_DATE`
- `APPOINTMENT_CONFLICT`
- `UNAUTHORIZED`

## Data Validation

### Doctor Data
- `name`: Required, string
- `specialization`: Required, string
- `qualification`: Required, string
- `experience`: Required, string
- `consultationFee`: Optional, number
- `status`: Required, enum ["active", "inactive"]

### Appointment Data
- `doctorId`: Required, valid doctor ID
- `appointmentDate`: Required, ISO date string
- `appointmentTime`: Required, time string format "HH:MM AM/PM"
- `patientName`: Required, string
- `patientPhone`: Required, valid phone number
- `patientEmail`: Optional, valid email format

## Real-time Updates

Consider implementing WebSocket connections for real-time slot availability updates:

```javascript
// WebSocket connection for real-time updates
const ws = new WebSocket('ws://localhost:8000/slots');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'slot_update') {
    // Update slot availability in real-time
    updateSlotAvailability(data.doctorId, data.date, data.slots);
  }
};
```

## Rate Limiting

Implement rate limiting to prevent abuse:
- 10 appointment bookings per user per day
- 5 API calls per minute per user
- 100 API calls per hour per user

## Security Considerations

1. Validate all input data
2. Implement proper authentication
3. Use HTTPS for all API calls
4. Sanitize user inputs
5. Implement CSRF protection
6. Log all appointment-related activities
