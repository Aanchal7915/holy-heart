import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Holy Heart Hospital</h1>
            <p>Your health is our priority. Explore our services below:</p>
            <div className="navigation">
                <Link to="/tests" className="nav-link">Book a Medical Test</Link>
                <Link to="/opd" className="nav-link">Schedule an OPD Appointment</Link>
                <Link to="/dashboard" className="nav-link">View Your Reports</Link>
            </div>
        </div>
    );
};

export default Home;