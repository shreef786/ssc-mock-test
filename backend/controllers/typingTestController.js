// backend/controllers/typingTestController.js
const TypingTest = require("../models/TypingTest");

// Upload typing test text
exports.uploadTypingText = async (req, res) => {
  try {
    const { text } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const existing = await TypingTest.findOne({ date: today });

    if (existing) {
      existing.text = text;
      await existing.save();
    } else {
      const newTest = new TypingTest({ date: today, text });
      await newTest.save();
    }

    res.status(200).json({ message: "Typing text uploaded successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload typing text.", error });
  }
};

// Get today's typing test text
exports.getTypingText = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const test = await TypingTest.findOne({ date: today });

    if (test) {
      res.status(200).json({ text: test.text });
    } else {
      res.status(404).json({ message: "Typing test text not found for today." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving typing text.", error });
  }
};
