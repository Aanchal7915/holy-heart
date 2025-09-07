import axios from 'axios';
import { Doctor, Appointment } from '../types';

const API_BASE_URL = 'https://api.holyhearthospital.com'; // Replace with actual API base URL

export const fetchDoctors = async (): Promise<Doctor[]> => {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    return response.data;
};

export const fetchDoctorAvailability = async (doctorId: string, date: string): Promise<Appointment[]> => {
    const response = await axios.get(`${API_BASE_URL}/doctors/${doctorId}/availability`, {
        params: { date }
    });
    return response.data;
};

export const bookAppointment = async (appointmentData: Appointment): Promise<void> => {
    await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
};