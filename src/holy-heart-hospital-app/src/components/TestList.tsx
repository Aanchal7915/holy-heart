import React, { useEffect, useState } from 'react';
import { fetchTests } from '../services/api';
import { Test } from '../types';

const TestList: React.FC = () => {
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTests = async () => {
            try {
                const data = await fetchTests();
                setTests(data);
            } catch (err) {
                setError('Failed to fetch tests');
            } finally {
                setLoading(false);
            }
        };

        getTests();
    }, []);

    const handleBooking = (testId: string) => {
        // Logic to handle test booking
        console.log(`Booking test with ID: ${testId}`);
    };

    if (loading) {
        return <div>Loading tests...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Available Medical Tests</h2>
            <ul>
                {tests.map(test => (
                    <li key={test.id}>
                        <h3>{test.name}</h3>
                        <p>{test.description}</p>
                        <p>Price: ${test.price}</p>
                        <button onClick={() => handleBooking(test.id)}>Book Now</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestList;