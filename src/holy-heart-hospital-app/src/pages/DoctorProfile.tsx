import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDoctorProfile } from '../services/api';
import { Doctor } from '../types';

const DoctorProfile: React.FC = () => {
    const { doctorId } = useParams<{ doctorId: string }>();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getDoctorProfile = async () => {
            try {
                const data = await fetchDoctorProfile(doctorId);
                setDoctor(data);
            } catch (err) {
                setError('Failed to fetch doctor profile');
            } finally {
                setLoading(false);
            }
        };

        getDoctorProfile();
    }, [doctorId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!doctor) {
        return <div>No doctor found</div>;
    }

    return (
        <div>
            <h1>{doctor.name}</h1>
            <p>Designation: {doctor.designation}</p>
            <p>Profile: {doctor.profile}</p>
            <h2>Available Timings</h2>
            <ul>
                {doctor.availableTimings.map((timing, index) => (
                    <li key={index}>{timing}</li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorProfile;