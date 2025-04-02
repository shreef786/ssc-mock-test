const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

// ✅ API to Upload Maths Questions
router.post("/add", async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    if (!question || !options || !correctAnswer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await db.collection("maths_questions").add({ question, options, correctAnswer, date: new Date() });

    res.status(201).json({ message: "Maths question added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding question", error });
  }
});

// ✅ API to Fetch Maths Questions
router.get("/list", async (req, res) => {
  try {
    const snapshot = await db.collection("maths_questions").orderBy("date", "desc").limit(50).get();
    const questionList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(questionList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
});

module.exports = router;
