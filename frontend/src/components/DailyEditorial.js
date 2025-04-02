import React, { useState, useEffect } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";

const DailyEditorial = () => {
  const [editorials, setEditorials] = useState([]);

  useEffect(() => {
    const fetchEditorials = async () => {
      const querySnapshot = await getDocs(collection(db, "editorials"));
      const editorialList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEditorials(editorialList);
    };
    fetchEditorials();
  }, []);

  return (
    <div>
      <h2>Daily Editorials</h2>
      {editorials.map((editorial) => (
        <div key={editorial.id}>
          <h3>{editorial.title}</h3>
          <p>{editorial.content}</p>
        </div>
      ))}
    </div>
  );
};

export default DailyEditorial;
