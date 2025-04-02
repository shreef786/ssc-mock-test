import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebase";

const TypingResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const querySnapshot = await getDocs(collection(db, "typing_results"));
      const resultsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResults(resultsList);
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h2>Typing Test Results</h2>
      {results.map((result) => (
        <div key={result.id}>
          <p><strong>{result.username}</strong> - WPM: {result.wpm}, Accuracy: {result.accuracy}%</p>
        </div>
      ))}
    </div>
  );
};

export default TypingResults;
