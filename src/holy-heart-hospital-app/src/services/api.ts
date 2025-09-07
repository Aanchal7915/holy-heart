import axios from 'axios';

const API_BASE_URL = 'https://api.holyhearthospital.com'; // Replace with your actual API base URL

export const fetchTests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tests`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching tests: ' + error.message);
    }
};

export const bookTest = async (testId, userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tests/book`, {
            testId,
            ...userData
        });
        return response.data;
    } catch (error) {
        throw new Error('Error booking test: ' + error.message);
    }
};

export const fetchReports = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/reports/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching reports: ' + error.message);
    }
};

export const fetchDoctors = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/doctors`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching doctors: ' + error.message);
    }
};

export const fetchDoctorAvailability = async (doctorId, date) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/doctors/${doctorId}/availability`, {
            params: { date }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching doctor availability: ' + error.message);
    }
};

export const bookAppointment = async (doctorId, date, timeSlot, userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/appointments/book`, {
            doctorId,
            date,
            timeSlot,
            ...userData
        });
        return response.data;
    } catch (error) {
        throw new Error('Error booking appointment: ' + error.message);
    }
};