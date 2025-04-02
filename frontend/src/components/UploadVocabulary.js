import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase";

const UploadVocabulary = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!word || !meaning) {
      alert("Word and Meaning are required!");
      return;
    }
    try {
      await addDoc(collection(db, "vocabulary"), {
        word,
        meaning,
        example,
        date: new Date(),
      });
      alert("Vocabulary Added Successfully!");
      setWord("");
      setMeaning("");
      setExample("");
    } catch (error) {
      console.error("Error adding vocabulary:", error);
      alert("Failed to add vocabulary.");
    }
  };

  return (
    <div>
      <h2>Upload Daily Vocabulary</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Word" value={word} onChange={(e) => setWord(e.target.value)} required />
        <input type="text" placeholder="Meaning" value={meaning} onChange={(e) => setMeaning(e.target.value)} required />
        <input type="text" placeholder="Example (Optional)" value={example} onChange={(e) => setExample(e.target.value)} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadVocabulary;
