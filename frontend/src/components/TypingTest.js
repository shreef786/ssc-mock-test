import React, { useState, useEffect } from "react";
import { db, collection, addDoc } from "../firebase";

const sampleText = "The quick brown fox jumps over the lazy dog.";

const TypingTest = () => {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completed, setCompleted] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput === sampleText) {
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 60000; // in minutes
      const words = sampleText.split(" ").length;
      const calculatedWpm = Math.round(words / timeTaken);
      
      const correctChars = sampleText.split("").filter((char, index) => char === userInput[index]).length;
      const calculatedAccuracy = Math.round((correctChars / sampleText.length) * 100);

      setWpm(calculatedWpm);
      setAccuracy(calculatedAccuracy);
      setCompleted(true);
    }
  }, [userInput]);

  const handleSaveResult = async () => {
    if (!username) {
      alert("Enter your name!");
      return;
    }
    try {
      await addDoc(collection(db, "typing_results"), { username, wpm, accuracy, date: new Date() });
      alert("Typing result saved!");
    } catch (error) {
      console.error("Error saving typing result:", error);
      alert("Failed to save result.");
    }
  };

  return (
    <div>
      <h2>Typing Test</h2>
      <p>{sampleText}</p>
      <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} disabled={completed}></textarea>
      {completed && (
        <div>
          <p>WPM: {wpm}</p>
          <p>Accuracy: {accuracy}%</p>
          <input type="text" placeholder="Enter Name" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button onClick={handleSaveResult}>Save Result</button>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
