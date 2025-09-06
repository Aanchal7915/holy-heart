import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Dummy doctor availability + appointments
const doctorSlots = [
  {
    id: "slot1",
    title: "Available Slot",
    start: new Date("2025-09-08T20:10:00"),
    end: new Date("2025-09-08T21:10:00"),
    type: "availability",
  },
  {
    id: "slot2",
    title: "Available Slot",
    start: new Date("2025-09-09T20:51:00"),
    end: new Date("2025-09-09T21:51:00"),
    type: "availability",
  },
];

const doctorAppointments = [
  {
    id: "appt1",
    title: "Appointment with John Doe",
    start: new Date("2025-09-08T20:10:00"),
    end: new Date("2025-09-08T21:10:00"),
    type: "appointment",
  },
];

export default function DoctorCalendar() {
  const [events] = useState([...doctorSlots, ...doctorAppointments]);

  const eventStyleGetter = (event) => {
    let bg = event.type === "availability" ? "#90EE90" : "#FF6961";
    return {
      style: {
        backgroundColor: bg,
        borderRadius: "8px",
        opacity: 0.9,
        color: "black",
        border: "0px",
        display: "block",
        fontSize: "14px",
        padding: "4px",
      },
    };
  };

  return (
    <div style={{ height: "90vh", padding: "20px", paddingTop: "80px" }}>
      <h2 className="text-xl font-bold mb-4">Doctor's Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
        defaultView="week"
        views={["day", "week", "month"]}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
