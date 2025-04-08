import { db } from "../../firebaseConfig.js";
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

document.getElementById("typingTextForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = document.getElementById("typingDate").value;
  const text = document.getElementById("typingText").value;

  try {
    await setDoc(doc(collection(db, "typingText"), date), {
      text,
      date,
    });
    document.getElementById("typingStatus").textContent = "Typing text uploaded successfully!";
  } catch (error) {
    console.error("Error uploading typing text:", error);
    document.getElementById("typingStatus").textContent = "Error uploading typing text.";
  }
});
