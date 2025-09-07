import React, { useState, useEffect } from 'react';
import { fetchDoctorAvailability, bookAppointment } from '../services/opdService';
import SlotSelector from './SlotSelector';

const OPDBooking = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [bookingStatus, setBookingStatus] = useState('');

    useEffect(() => {
        // Fetch the list of doctors when the component mounts
        const fetchDoctors = async () => {
            const response = await fetch('/api/doctors'); // Adjust the API endpoint as necessary
            const data = await response.json();
            setDoctors(data);
        };
        fetchDoctors();
    }, []);

    const handleDoctorChange = (doctor) => {
        setSelectedDoctor(doctor);
        setAvailableSlots([]); // Reset available slots when doctor changes
    };

    const handleDateChange = async (date) => {
        setSelectedDate(date);
        if (selectedDoctor) {
            const slots = await fetchDoctorAvailability(selectedDoctor.id, date);
            setAvailableSlots(slots);
        }
    };

    const handleBooking = async (slot) => {
        const response = await bookAppointment(selectedDoctor.id, selectedDate, slot);
        if (response.success) {
            setBookingStatus('Appointment booked successfully!');
            setAvailableSlots((prevSlots) => prevSlots.filter(s => s !== slot)); // Remove booked slot
        } else {
            setBookingStatus('Failed to book appointment. Please try again.');
        }
    };

    return (
        <div>
            <h2>OPD Booking</h2>
            <select onChange={(e) => handleDoctorChange(JSON.parse(e.target.value))}>
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                    <option key={doctor.id} value={JSON.stringify(doctor)}>
                        {doctor.name} - {doctor.designation}
                    </option>
                ))}
            </select>
            <input type="date" onChange={(e) => handleDateChange(e.target.value)} />
            {availableSlots.length > 0 && (
                <SlotSelector slots={availableSlots} onBook={handleBooking} />
            )}
            {bookingStatus && <p>{bookingStatus}</p>}
        </div>
    );
};

export default OPDBooking;