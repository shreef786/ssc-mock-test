import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import db from "../config/db.js";

export const addGrammarText = async (data) => {
  return await addDoc(collection(db, "grammarTexts"), data);
};

export const getLatestGrammarText = async () => {
  const q = query(collection(db, "grammarTexts"), orderBy("date", "desc"), limit(1));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data())[0];
};
