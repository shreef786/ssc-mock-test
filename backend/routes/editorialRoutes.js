const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

// ✅ API to Upload Daily Editorial
router.post("/add", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and Content are required" });
    }

    await db.collection("editorials").add({ title, content, date: new Date() });

    res.status(201).json({ message: "Editorial added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding editorial", error });
  }
});

// ✅ API to Fetch Daily Editorials
router.get("/list", async (req, res) => {
  try {
    const snapshot = await db.collection("editorials").orderBy("date", "desc").limit(10).get();
    const editorialList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(editorialList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching editorials", error });
  }
});

module.exports = router;
