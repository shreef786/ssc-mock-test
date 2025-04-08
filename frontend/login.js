import { auth } from "../../firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("loginStatus").textContent = "Login successful!";
    window.location.href = "dashboard.html"; // student dashboard after login
  } catch (error) {
    document.getElementById("loginStatus").textContent = `Error: ${error.message}`;
  }
});
