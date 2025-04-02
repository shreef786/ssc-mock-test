import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import api from '../utils/api';

const TestPage = () => {
    const { testId } = useParams(); // Get the test ID from the URL
    const history = useHistory();
    const [test, setTest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerStarted, setTimerStarted] = useState(false);

    useEffect(() => {
        // Fetch test details and questions when the page loads
        fetchTestDetails();
        fetchQuestions();
    }, [testId]);

    const fetchTestDetails = async () => {
        try {
            const response = await api.get(`/api/test/${testId}`);
            setTest(response.data);
            setTimeLeft(response.data.timeLimit * 60); // Convert time limit from minutes to seconds
        } catch (error) {
            console.error('Error fetching test details:', error);
        }
    };

    const fetchQuestions = async () => {
        try {
            const response = await api.get(`/api/questions/${testId}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswerSelection = (questionId, answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answer,
        });
    };

    const handleSubmitTest = async () => {
        try {
            // Submit answers to backend
            const response = await api.post('/api/submit-test', {
                testId,
                answers: selectedAnswers,
            });
            // Navigate to the results page after submitting the test
            history.push(`/results/${response.data.testId}`);
        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

    const handleTestTimeout = () => {
        // Automatically submit test when time runs out
        handleSubmitTest();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {test ? (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-semibold text-gray-800">Test: {test.name}</h2>
                        <CountdownTimer
                            timeLeft={timeLeft}
                            onTimeOut={handleTestTimeout}
                            timerStarted={timerStarted}
                        />
                    </div>

                    <div className="space-y-6">
                        {questions.map((question) => (
                            <div key={question._id} className="bg-gray-100 p-4 rounded-md">
                                <h4 className="font-medium text-lg">{question.questionText}</h4>
                                <div className="space-y-4 mt-4">
                                    {question.options.map((option, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="radio"
                                                name={`question-${question._id}`}
                                                value={option}
                                                checked={selectedAnswers[question._id] === option}
                                                onChange={() => handleAnswerSelection(question._id, option)}
                                                className="mr-2"
                                            />
                                            <label>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSubmitTest}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Submit Test
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">Loading Test...</div>
            )}
        </div>
    );
};

export default TestPage;
