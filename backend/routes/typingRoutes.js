const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

// ✅ API to Save Typing Test Result
router.post("/save", async (req, res) => {
  try {
    const { username, wpm, accuracy } = req.body;
    if (!username || !wpm || !accuracy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await db.collection("typing_results").add({
      username,
      wpm,
      accuracy,
      date: new Date(),
    });

    res.status(201).json({ message: "Typing result saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving typing result", error });
  }
});

// ✅ API to Get Typing Test Results
router.get("/results", async (req, res) => {
  try {
    const snapshot = await db.collection("typing_results").orderBy("date", "desc").get();
    const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error });
  }
});

module.exports = router;
