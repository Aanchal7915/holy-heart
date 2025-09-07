import React, { useEffect, useState } from 'react';
import { fetchBookedTests, fetchUserReports } from '../services/api';
import ReportDashboard from '../components/ReportDashboard';
import TestList from '../components/TestList';

const Dashboard = () => {
    const [bookedTests, setBookedTests] = useState([]);
    const [userReports, setUserReports] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const tests = await fetchBookedTests();
            const reports = await fetchUserReports();
            setBookedTests(tests);
            setUserReports(reports);
        };

        loadData();
    }, []);

    return (
        <div className="dashboard">
            <h1>User Dashboard</h1>
            <h2>Booked Tests</h2>
            <TestList tests={bookedTests} />
            <h2>Your Reports</h2>
            <ReportDashboard reports={userReports} />
        </div>
    );
};

export default Dashboard;