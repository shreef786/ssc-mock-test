import { useState, useEffect } from "react";

function MockTest() {
  const questions = [
    { id: 1, question: "What is the capital of India?", options: ["Delhi", "Mumbai", "Chennai", "Kolkata"], answer: "Delhi" },
    { id: 2, question: "Who wrote the Indian national anthem?", options: ["Rabindranath Tagore", "Sarojini Naidu", "Subhash Chandra Bose", "Mahatma Gandhi"], answer: "Rabindranath Tagore" },
    { id: 3, question: "Which is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full bg-blue-900 text-white text-center py-4">
        <h1 className="text-lg font-bold">SSC Mock Test</h1>
        <p className="text-sm">Time Left: {formatTime(timeLeft)}</p>
      </div>

      {/* Question Panel */}
      <div className="bg-white w-full max-w-3xl p-6 shadow-lg rounded-lg mt-6">
        <h2 className="text-lg font-bold mb-2">{questions[currentQuestion].question}</h2>
        <ul>
          {questions[currentQuestion].options.map((option, index) => (
            <li key={index} className="p-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="option" 
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                <span>{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-3xl mt-6">
        <button className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(currentQuestion - 1)}>
          Previous
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" disabled={!selectedOption} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MockTest;
import { useNavigate } from "react-router-dom";

function MockTest() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let finalScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].answer) finalScore++;
    });
    setScore(finalScore);
    navigate("/result", { state: { score: finalScore, total: questions.length } });
  };

  return (
    <div className="flex justify-center">
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Submit Test
      </button>
    </div>
  );
}
