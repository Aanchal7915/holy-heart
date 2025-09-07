import React, { useEffect, useState } from 'react';
import { fetchReports } from '../services/api';
import { Report } from '../types';

const ReportDashboard: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getReports = async () => {
            try {
                const fetchedReports = await fetchReports();
                setReports(fetchedReports);
            } catch (err) {
                setError('Failed to fetch reports');
            } finally {
                setLoading(false);
            }
        };

        getReports();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Your Medical Reports</h2>
            {reports.length === 0 ? (
                <p>No reports available.</p>
            ) : (
                <ul>
                    {reports.map((report) => (
                        <li key={report.id}>
                            <h3>{report.title}</h3>
                            <p>{report.description}</p>
                            <p>Date: {new Date(report.date).toLocaleDateString()}</p>
                            <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">View Report</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReportDashboard;