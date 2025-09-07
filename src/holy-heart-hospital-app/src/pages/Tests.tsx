import React from 'react';
import TestList from '../components/TestList';

const Tests: React.FC = () => {
    return (
        <div>
            <h1>Available Medical Tests</h1>
            <TestList />
        </div>
    );
};

export default Tests;