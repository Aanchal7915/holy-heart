import React, { useState } from 'react';
import { bookTest } from '../services/api';
import { Test } from '../types';

interface TestBookingProps {
  selectedTest: Test;
  onBookingSuccess: (message: string) => void;
}

const TestBooking: React.FC<TestBookingProps> = ({ selectedTest, onBookingSuccess }) => {
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBooking = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await bookTest({ testId: selectedTest.id, userName, userContact });
      if (response.success) {
        onBookingSuccess('Test booked successfully! Check your dashboard for details.');
      } else {
        setError('Booking failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while booking the test.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="test-booking">
      <h2>Booking for: {selectedTest.name}</h2>
      <p>{selectedTest.description}</p>
      <p>Price: ${selectedTest.price}</p>

      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Your Contact"
        value={userContact}
        onChange={(e) => setUserContact(e.target.value)}
        required
      />

      <button onClick={handleBooking} disabled={loading}>
        {loading ? 'Booking...' : 'Book Test'}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TestBooking;