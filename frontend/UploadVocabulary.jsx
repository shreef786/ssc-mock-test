import React, { useState } from 'react';

const UploadVocabulary = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vocabulary Uploaded", { word, meaning, example });
    // Firebase upload logic yahan aayega
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Daily Vocabulary</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Word"
          className="w-full p-2 border border-gray-300 rounded"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <input
          type="text"
          placeholder="Meaning"
          className="w-full p-2 border border-gray-300 rounded"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
        />
        <textarea
          placeholder="Example Sentence"
          className="w-full p-2 h-28 border border-gray-300 rounded"
          value={example}
          onChange={(e) => setExample(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload Vocabulary
        </button>
      </form>
    </div>
  );
};

export default UploadVocabulary;
