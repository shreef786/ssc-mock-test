import { db } from "../../firebaseConfig.js";
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

document.getElementById("grammarForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = document.getElementById("grammarDate").value;
  const hindiText = document.getElementById("grammarHindi").value;

  try {
    await setDoc(doc(collection(db, "grammarText"), date), {
      hindiText,
      date,
    });
    document.getElementById("grammarStatus").textContent = "Grammar text uploaded successfully!";
  } catch (error) {
    console.error("Error uploading grammar text:", error);
    document.getElementById("grammarStatus").textContent = "Error uploading grammar text.";
  }
});
