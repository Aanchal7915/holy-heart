export const getAvailableSlots = (slots: string[], bookedSlots: string[]) => {
    return slots.filter(slot => !bookedSlots.includes(slot));
};

export const suggestNextAvailableSlot = (slots: string[], bookedSlots: string[], selectedSlot: string) => {
    const availableSlots = getAvailableSlots(slots, bookedSlots);
    const selectedIndex = slots.indexOf(selectedSlot);
    
    for (let i = selectedIndex + 1; i < slots.length; i++) {
        if (availableSlots.includes(slots[i])) {
            return slots[i];
        }
    }
    
    return null; // No next available slot
};

export const isSlotBooked = (slot: string, bookedSlots: string[]) => {
    return bookedSlots.includes(slot);
};