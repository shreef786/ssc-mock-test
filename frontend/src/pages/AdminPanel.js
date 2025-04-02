import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminPanel = () => {
    const [testList, setTestList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await api.get('/api/admin/tests');
            setTestList(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tests:', error);
            setLoading(false);
        }
    };

    const handleDeleteTest = async (testId) => {
        if (window.confirm('Are you sure you want to delete this test?')) {
            try {
                await api.delete(`/api/admin/delete-test/${testId}`);
                fetchTests(); // Refresh the test list after deletion
            } catch (error) {
                console.error('Error deleting test:', error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Admin Panel</h2>
            
            <div className="mb-4">
                <Link
                    to="/admin/create-test"
                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                >
                    Create New Test
                </Link>
            </div>

            {loading ? (
                <div className="text-center">Loading tests...</div>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Test Name</th>
                                <th className="px-4 py-2 text-left">Total Questions</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testList.length > 0 ? (
                                testList.map((test) => (
                                    <tr key={test._id}>
                                        <td className="px-4 py-2">{test.testName}</td>
                                        <td className="px-4 py-2">{test.totalQuestions}</td>
                                        <td className="px-4 py-2">
                                            <Link
                                                to={`/admin/edit-test/${test._id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            {' | '}
                                            <button
                                                onClick={() => handleDeleteTest(test._id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">
                                        No tests available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
