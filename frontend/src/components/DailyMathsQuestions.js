import React, { useState, useEffect } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";

const DailyMathsQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "maths_questions"));
      const questionList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionList);
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>Daily Maths Questions</h2>
      {questions.map((q, index) => (
        <div key={q.id}>
          <p><strong>Q{index + 1}:</strong> {q.question}</p>
          <ul>
            {q.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
          <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
        </div>
      ))}
    </div>
  );
};

export default DailyMathsQuestions;
