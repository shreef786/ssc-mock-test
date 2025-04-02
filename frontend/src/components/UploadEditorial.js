import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase";

const UploadEditorial = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and Content are required!");
      return;
    }
    try {
      await addDoc(collection(db, "editorials"), { title, content, date: new Date() });
      alert("Editorial Added Successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding editorial:", error);
      alert("Failed to add editorial.");
    }
  };

  return (
    <div>
      <h2>Upload Daily Editorial</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Editorial Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadEditorial;
