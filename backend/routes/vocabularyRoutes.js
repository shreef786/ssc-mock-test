const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

// ✅ API to Upload Daily Vocabulary
router.post("/add", async (req, res) => {
  try {
    const { word, meaning, example } = req.body;
    if (!word || !meaning) {
      return res.status(400).json({ message: "Word and Meaning are required" });
    }

    await db.collection("vocabulary").add({ word, meaning, example, date: new Date() });

    res.status(201).json({ message: "Vocabulary added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding vocabulary", error });
  }
});

// ✅ API to Fetch Daily Vocabulary
router.get("/list", async (req, res) => {
  try {
    const snapshot = await db.collection("vocabulary").orderBy("date", "desc").limit(10).get();
    const vocabList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(vocabList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vocabulary", error });
  }
});

module.exports = router;
