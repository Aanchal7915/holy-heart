export interface Test {
    id: string;
    name: string;
    description: string;
    price: number;
}

export interface Report {
    id: string;
    testId: string;
    userId: string;
    reportUrl: string;
    createdAt: Date;
}

export interface Doctor {
    id: string;
    name: string;
    designation: string;
    profile: string;
    timings: string[];
}

export interface Appointment {
    id: string;
    doctorId: string;
    userId: string;
    date: Date;
    timeSlot: string;
}