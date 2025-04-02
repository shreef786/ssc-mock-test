import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TestCard from '../components/TestCard'; // Importing TestCard component

const Home = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        // Fetching mock tests data from the backend
        const fetchTests = async () => {
            try {
                const response = await fetch('/api/test-list');
                const data = await response.json();
                setTests(data);
            } catch (error) {
                console.error("Error fetching test data:", error);
            }
        };

        fetchTests();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-semibold text-gray-800">Welcome to SSC Mock Test</h1>
                <p className="mt-4 text-xl text-gray-600">Prepare for your SSC exams with our real-time mock tests.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {tests.length > 0 ? (
                    tests.map(test => (
                        <TestCard key={test.id} test={test} />
                    ))
                ) : (
                    <p className="text-center col-span-full text-lg text-gray-500">No tests available.</p>
                )}
            </div>

            <div className="mt-8 text-center">
                <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-md text-xl hover:bg-blue-700">
                    Start a Mock Test
                </Link>
            </div>
        </div>
    );
};

export default Home;
