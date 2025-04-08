import React, { useState } from 'react';

const UploadTypingTest = () => {
  const [typingText, setTypingText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Typing Text Uploaded", typingText);
    // Firebase logic yahan lagega
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Typing Test Text</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Enter English Typing Text"
          className="w-full p-2 h-60 border border-gray-300 rounded"
          value={typingText}
          onChange={(e) => setTypingText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Upload Text
        </button>
      </form>
    </div>
  );
};

export default UploadTypingTest;
