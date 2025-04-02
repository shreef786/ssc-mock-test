import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6ss0QN26iRl6-YEd7lfaGjys5-NI9xlo",
  authDomain: "ssc-mock-test-ed538.firebaseapp.com",
  projectId: "ssc-mock-test-ed538",
  storageBucket: "ssc-mock-test-ed538.firebasestorage.app",
  messagingSenderId: "739279621457",
  appId: "1:739279621457:android:ecf30f788849b56c29d770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
