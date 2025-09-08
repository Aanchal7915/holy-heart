# Enhanced OPD Booking Interface

A comprehensive, responsive OPD booking system for the Holy Heart Hospital website that provides a seamless appointment booking experience for patients.

## Features

### 🏥 **Doctor Selection**
- Browse available doctors by specialization
- View doctor profiles with qualifications, experience, and consultation fees
- Filter doctors by service type (Treatment/Diagnostic Tests)
- Real-time doctor availability status

### 📅 **Interactive Calendar**
- Visual calendar interface for date selection
- Highlight available dates for selected doctor
- Disable past dates and unavailable dates
- Month navigation with smooth transitions

### ⏰ **Time Slot Management**
- Real-time slot availability checking
- Visual slot status (available/booked)
- Conflict detection with next available slot suggestions
- Loading states for better UX

### 📝 **Appointment Booking**
- Multi-step booking process with progress indicator
- Patient information collection
- Symptoms/message input
- Appointment confirmation with summary

### 🔄 **Appointment Management**
- Reschedule existing appointments
- Cancel appointments with confirmation
- View appointment history
- Real-time status updates

### 📱 **Responsive Design**
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes
- Smooth animations and transitions

## Components

### 1. **BookAppointment** (Main Component)
- Multi-step booking wizard
- State management for the entire booking flow
- API integration for all booking operations

### 2. **CalendarComponent**
- Interactive calendar with date selection
- Month navigation
- Available date highlighting
- Past date disabling

### 3. **TimeSlotSelector**
- Time slot grid display
- Real-time availability status
- Loading and empty states
- Conflict detection

### 4. **DoctorCard**
- Doctor profile display
- Selection state management
- Contact information display
- Consultation fee display

### 5. **AppointmentManager** (Utility Component)
- Appointment history display
- Reschedule/cancel functionality
- Status management
- Modal dialogs for actions

## API Integration

The system integrates with the following backend endpoints:

- `GET /doctors` - Fetch all available doctors
- `GET /doctors/:id/available-dates` - Get available dates for a doctor
- `GET /doctors/:id/slots/:date` - Get time slots for a specific date
- `POST /appointments/book` - Book a new appointment
- `PUT /appointments/:id/reschedule` - Reschedule an appointment
- `DELETE /appointments/:id` - Cancel an appointment
- `GET /appointments/user` - Get user's appointments

## User Flow

1. **Service Selection**: Choose between Treatment or Diagnostic Test
2. **Doctor Selection**: Browse and select a doctor from available options
3. **Date Selection**: Pick an available date from the interactive calendar
4. **Time Selection**: Choose from available time slots
5. **Details Entry**: Fill in patient information and symptoms
6. **Confirmation**: Review and confirm the appointment

## Error Handling

- **Network Errors**: Graceful handling of API failures
- **Validation Errors**: Real-time form validation
- **Conflict Detection**: Slot conflict alerts with alternatives
- **Loading States**: Visual feedback during API calls
- **Empty States**: Helpful messages when no data is available

## Accessibility Features

- Keyboard navigation support
- Screen reader compatibility
- High contrast color schemes
- Focus indicators
- ARIA labels and descriptions

## Performance Optimizations

- Lazy loading of doctor data
- Efficient re-rendering with React hooks
- Optimized API calls with proper caching
- Image optimization for doctor photos
- Smooth animations with Framer Motion

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Installation & Setup

1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```env
   VITE_BACKEND=http://localhost:8000
   ```

3. The component is ready to use in your React application.

## Usage Example

```jsx
import BookAppointment from './pages/BookAppointment';

function App() {
  return (
    <div className="App">
      <BookAppointment />
    </div>
  );
}
```

## Customization

### Styling
The component uses Tailwind CSS classes and can be easily customized by:
- Modifying color schemes in the className props
- Adjusting spacing and layout
- Customizing animations and transitions

### API Endpoints
Update the `backendUrl` variable to point to your backend server:
```javascript
const backendUrl = import.meta.env.VITE_BACKEND || "http://your-backend-url";
```

### Time Slots
Modify the time slot options in the reschedule modal or create a dynamic time slot generator based on your hospital's schedule.

## Security Considerations

- All API calls include authentication tokens
- Input validation on both client and server side
- XSS protection through proper data sanitization
- CSRF protection for state-changing operations

## Future Enhancements

- [ ] Real-time notifications for appointment updates
- [ ] Video consultation booking
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Advanced filtering options
- [ ] Appointment reminders
- [ ] Doctor rating and reviews
- [ ] Waitlist functionality

## Support

For technical support or feature requests, please contact the development team or create an issue in the project repository.

## License

This component is part of the Holy Heart Hospital website project and follows the same licensing terms.
