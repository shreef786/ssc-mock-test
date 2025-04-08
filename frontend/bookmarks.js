import { db, auth } from "../../firebaseConfig.js";
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const container = document.getElementById("bookmarkedQuestions");

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    alert("Login required to view bookmarks.");
    window.location.href = "../login.html";
    return;
  }

  const q = query(
    collection(db, "bookmarks"),
    where("uid", "==", user.uid),
    orderBy("bookmarkedAt", "desc")
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    container.innerHTML = "<p>No bookmarked questions yet.</p>";
    return;
  }

  snapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <hr>
      <p><strong>Question:</strong> ${data.question}</p>
      <ul>
        <li><strong>A:</strong> ${data.options.A}</li>
        <li><strong>B:</strong> ${data.options.B}</li>
        <li><strong>C:</strong> ${data.options.C}</li>
        <li><strong>D:</strong> ${data.options.D}</li>
      </ul>
    `;
    container.appendChild(div);
  });
});
