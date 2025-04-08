import { db } from "../../firebaseConfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

document.getElementById("mockTestForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const examName = document.getElementById("examName").value;
  const paperName = document.getElementById("paperName").value;
  const question = document.getElementById("questionText").value;
  const optionA = document.getElementById("optionA").value;
  const optionB = document.getElementById("optionB").value;
  const optionC = document.getElementById("optionC").value;
  const optionD = document.getElementById("optionD").value;
  const correctAnswer = document.getElementById("correctAnswer").value;
  const explanation = document.getElementById("explanation").value;

  try {
    await addDoc(collection(db, "mockTests"), {
      examName,
      paperName,
      question,
      options: {
        A: optionA,
        B: optionB,
        C: optionC,
        D: optionD
      },
      correctAnswer,
      explanation
    });

    document.getElementById("mockTestStatus").textContent = "Mock test question uploaded successfully!";
  } catch (error) {
    console.error("Error uploading mock test question:", error);
    document.getElementById("mockTestStatus").textContent = "Error uploading mock test question.";
  }
});
