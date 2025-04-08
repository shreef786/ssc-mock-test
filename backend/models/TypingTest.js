import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import db from "../config/db.js";

export const addTypingTestText = async (data) => {
  return await addDoc(collection(db, "typingTests"), data);
};

export const getLatestTypingTest = async () => {
  const q = query(collection(db, "typingTests"), orderBy("date", "desc"), limit(1));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data())[0];
};