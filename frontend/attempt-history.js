import { db, auth } from "../../firebaseConfig.js";
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const historyTable = document.getElementById("historyTable");

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    alert("Please login to view your attempt history.");
    window.location.href = "../login.html";
    return;
  }

  const q = query(
    collection(db, "leaderboard"),
    where("uid", "==", user.uid),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("tr");

    const date = data.timestamp?.toDate().toLocaleString() || "N/A";

    row.innerHTML = `
      <td>${date}</td>
      <td>${data.testName}</td>
      <td>${data.score}</td>
    `;
    historyTable.appendChild(row);
  });
});
