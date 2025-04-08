import { db } from "../../firebaseConfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const container = document.getElementById("solutionsContainer");

async function loadSolutions() {
  const snapshot = await getDocs(collection(db, "mockTests"));
  snapshot.forEach((doc, index) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.padding = "10px";
    div.style.margin = "10px 0";
    div.innerHTML = `
      <b>Q${index + 1}: ${data.question}</b><br>
      A) ${data.options.A}<br>
      B) ${data.options.B}<br>
      C) ${data.options.C}<br>
      D) ${data.options.D}<br>
      <strong>Correct Answer:</strong> ${data.correctAnswer}<br>
      <strong>Solution:</strong> ${data.explanation}
    `;
    container.appendChild(div);
  });
}

loadSolutions();
