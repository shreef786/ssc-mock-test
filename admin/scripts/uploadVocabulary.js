import { db } from "../../firebaseConfig.js";
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

document.getElementById("vocabForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = document.getElementById("vocabDate").value;
  const words = document.getElementById("vocabWords").value.split("\n").map(word => word.trim()).filter(word => word);

  try {
    await setDoc(doc(collection(db, "vocabulary"), date), {
      words,
      date,
    });
    document.getElementById("vocabStatus").textContent = "Vocabulary uploaded successfully!";
  } catch (error) {
    console.error("Error uploading vocabulary:", error);
    document.getElementById("vocabStatus").textContent = "Error uploading vocabulary.";
  }
});
