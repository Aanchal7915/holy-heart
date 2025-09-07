import React, { useEffect, useState } from 'react';
import DoctorList from '../components/DoctorList';
import OPDBooking from '../components/OPDBooking';
import { fetchDoctors } from '../services/opdService';

const OPD = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const getDoctors = async () => {
            const doctorData = await fetchDoctors();
            setDoctors(doctorData);
        };
        getDoctors();
    }, []);

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
    };

    return (
        <div className="opd-container">
            <h1>OPD Booking</h1>
            <DoctorList doctors={doctors} onDoctorSelect={handleDoctorSelect} />
            {selectedDoctor && (
                <OPDBooking doctor={selectedDoctor} date={date} />
            )}
        </div>
    );
};

export default OPD;