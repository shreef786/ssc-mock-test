import { db } from "../../firebaseConfig.js";
import { collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const tableBody = document.getElementById("leaderboardTable");

async function fetchLeaderboard() {
  const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(20));
  const querySnapshot = await getDocs(q);

  let rank = 1;
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${rank}</td>
      <td>${data.email}</td>
      <td>${data.score}</td>
      <td>${data.testName}</td>
    `;
    tableBody.appendChild(row);
    rank++;
  });
}

fetchLeaderboard();
