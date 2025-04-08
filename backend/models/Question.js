import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../config/db.js";

export const addQuestion = async (data) => {
  const docRef = await addDoc(collection(db, "questions"), data);
  return docRef.id;
};

export const getAllQuestions = async () => {
  const querySnapshot = await getDocs(collection(db, "questions"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};