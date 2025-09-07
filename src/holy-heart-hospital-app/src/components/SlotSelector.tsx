import React, { useEffect, useState } from 'react';
import { fetchAvailableSlots } from '../services/opdService';
import { Slot } from '../types';

interface SlotSelectorProps {
  doctorId: string;
  selectedDate: string;
  onSlotSelect: (slot: Slot) => void;
}

const SlotSelector: React.FC<SlotSelectorProps> = ({ doctorId, selectedDate, onSlotSelect }) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSlots = async () => {
      setLoading(true);
      setError(null);
      try {
        const availableSlots = await fetchAvailableSlots(doctorId, selectedDate);
        setSlots(availableSlots);
      } catch (err) {
        setError('Failed to load slots. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadSlots();
  }, [doctorId, selectedDate]);

  const handleSlotClick = (slot: Slot) => {
    if (!slot.isBooked) {
      onSlotSelect(slot);
    }
  };

  return (
    <div>
      <h3>Select a Time Slot</h3>
      {loading && <p>Loading slots...</p>}
      {error && <p>{error}</p>}
      <ul>
        {slots.map((slot) => (
          <li key={slot.id} onClick={() => handleSlotClick(slot)} style={{ cursor: 'pointer', color: slot.isBooked ? 'gray' : 'blue' }}>
            {slot.time} - {slot.isBooked ? 'Already Booked' : 'Available'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlotSelector;