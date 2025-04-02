import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../utils/api';

const Results = () => {
    const { testId } = useParams(); // Get the test ID from the URL
    const [results, setResults] = useState(null);
    const history = useHistory();

    useEffect(() => {
        // Fetch the results when the page loads
        fetchResults();
    }, [testId]);

    const fetchResults = async () => {
        try {
            const response = await api.get(`/api/get-results/${testId}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    const handleRetakeTest = () => {
        history.push(`/test/${testId}`); // Redirect to the test page to retake the test
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {results ? (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Your Test Results</h2>
                        <div className="mb-4">
                            <h4 className="font-medium text-xl">Test Name: {results.testName}</h4>
                            <p className="text-lg">Total Questions: {results.totalQuestions}</p>
                            <p className="text-lg">Correct Answers: {results.correctAnswers}</p>
                            <p className="text-lg">Incorrect Answers: {results.incorrectAnswers}</p>
                            <p className="text-lg">Score: {results.score}%</p>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <button
                            onClick={handleRetakeTest}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Retake Test
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">Loading Results...</div>
            )}
        </div>
    );
};

export default Results;
