# Holy Heart Hospital Appointment System

## Overview
The Holy Heart Hospital Appointment System is a responsive web application designed to facilitate the booking of medical tests and outpatient department (OPD) appointments. The application provides users with a seamless experience to view available tests, book appointments, and access their medical reports.

## Features
- **Test Booking System**: Users can view a list of available medical tests, including descriptions and prices, and book appointments for selected tests.
- **Real-time OPD Booking**: Users can view a list of doctors, their designations, profiles, and daily OPD timings. The system fetches live availability for appointments and suggests the next available time slot if a selected slot is already booked.
- **User Dashboard**: Users can access their booked tests and uploaded medical reports in a user-friendly dashboard.
- **Responsive Design**: The application is designed to be mobile-friendly, ensuring a smooth experience across devices.

## Project Structure
```
holy-heart-hospital-app
├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── types
│   ├── utils
│   ├── App.tsx
│   └── index.tsx
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd holy-heart-hospital-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

## API Integration
The application integrates with a backend API to fetch data related to medical tests, doctor availability, and user reports. Ensure that the backend is running and accessible for the application to function correctly.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.