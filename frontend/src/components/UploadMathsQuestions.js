import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase";

const UploadMathsQuestions = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || options.some(opt => opt === "") || !correctAnswer) {
      alert("All fields are required!");
      return;
    }
    try {
      await addDoc(collection(db, "maths_questions"), { question, options, correctAnswer, date: new Date() });
      alert("Question Added Successfully!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question.");
    }
  };

  return (
    <div>
      <h2>Upload Daily Maths Question</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        {options.map((opt, index) => (
          <input key={index} type="text" placeholder={`Option ${index + 1}`} value={opt} onChange={(e) => handleOptionChange(index, e.target.value)} required />
        ))}
        <input type="text" placeholder="Correct Answer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadMathsQuestions;
