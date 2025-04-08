import { db, auth } from "../../firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

window.bookmarkCurrentQuestion = async function() {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login to bookmark questions.");
    return;
  }

  // Gather question data – IDs here should match your actual structure.
  const question = document.getElementById("questionText").innerText;
  const options = {
    A: document.getElementById("optionA").innerText,
    B: document.getElementById("optionB").innerText,
    C: document.getElementById("optionC").innerText,
    D: document.getElementById("optionD").innerText,
  };

  try {
    await addDoc(collection(db, "bookmarks"), {
      uid: user.uid,
      email: user.email,
      question,
      options,
      bookmarkedAt: serverTimestamp(),
    });
    alert("Question Bookmarked Successfully!");
  } catch (error) {
    console.error("Error bookmarking question:", error);
    alert("Error bookmarking question.");
  }
};
