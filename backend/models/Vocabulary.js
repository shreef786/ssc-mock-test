import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import db from "../config/db.js";

export const addVocabulary = async (data) => {
  return await addDoc(collection(db, "vocabulary"), data);
};

export const getLatestVocabulary = async () => {
  const q = query(collection(db, "vocabulary"), orderBy("date", "desc"), limit(7));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
