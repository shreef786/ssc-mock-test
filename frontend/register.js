import { auth } from "../../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById("registerStatus").textContent = "Registered successfully! Please login.";
  } catch (error) {
    document.getElementById("registerStatus").textContent = `Error: ${error.message}`;
  }
});
