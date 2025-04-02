import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuthContext();
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.push('/login'); // Redirect to login if no user is logged in
        } else {
            fetchUserData();
            fetchResults();
        }
    }, [user, history]);

    // User data fetch from the backend
    const fetchUserData = async () => {
        try {
            const response = await api.get('/api/user-data');
            setUserData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    // Test results fetch from the backend
    const fetchResults = async () => {
        try {
            const response = await api.get('/api/results');
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    // Logout function
    const handleLogout = () => {
        logout(); // Remove user from the context
        history.push('/login'); // Redirect to login page
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-semibold text-gray-800">Welcome, {userData?.name}</h2>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Results</h3>
                        <div className="space-y-4">
                            {results.length === 0 ? (
                                <p className="text-gray-600">You haven't attempted any tests yet.</p>
                            ) : (
                                results.map((result) => (
                                    <div key={result.testId} className="bg-gray-100 p-4 rounded-md">
                                        <h4 className="font-medium text-lg">{result.testName}</h4>
                                        <p>Score: {result.score}</p>
                                        <p>Time Taken: {result.timeTaken} minutes</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
                        <div className="space-y-2">
                            <p><strong>Email:</strong> {userData?.email}</p>
                            <p><strong>Joined:</strong> {new Date(userData?.joinedAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => history.push('/test')}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Start New Test
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
