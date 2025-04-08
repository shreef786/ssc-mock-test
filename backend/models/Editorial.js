import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import db from "../config/db.js";

export const addEditorial = async (data) => {
  return await addDoc(collection(db, "editorials"), data);
};

export const getLatestEditorials = async () => {
  const q = query(collection(db, "editorials"), orderBy("date", "desc"), limit(7));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};