import { db } from "../../firebaseConfig.js";
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

document.getElementById("editorialForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = document.getElementById("editorialDate").value;
  const content = document.getElementById("editorialContent").value;

  try {
    await setDoc(doc(collection(db, "editorials"), date), {
      content,
      date,
    });
    document.getElementById("editorialStatus").textContent = "Editorial uploaded successfully!";
  } catch (error) {
    console.error("Error uploading editorial:", error);
    document.getElementById("editorialStatus").textContent = "Error uploading editorial.";
  }
});
