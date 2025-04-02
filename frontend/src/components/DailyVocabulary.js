import React, { useState, useEffect } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";

const DailyVocabulary = () => {
  const [vocabulary, setVocabulary] = useState([]);

  useEffect(() => {
    const fetchVocabulary = async () => {
      const querySnapshot = await getDocs(collection(db, "vocabulary"));
      const vocabList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVocabulary(vocabList);
    };
    fetchVocabulary();
  }, []);

  return (
    <div>
      <h2>Daily Vocabulary</h2>
      <ul>
        {vocabulary.map((word) => (
          <li key={word.id}>
            <strong>{word.word}:</strong> {word.meaning} <br />
            <em>{word.example}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyVocabulary;
