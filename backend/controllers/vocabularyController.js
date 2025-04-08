// backend/controllers/vocabularyController.js
const Vocabulary = require("../models/Vocabulary");

// Upload daily vocabulary
exports.uploadVocabulary = async (req, res) => {
  try {
    const { words } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const existing = await Vocabulary.findOne({ date: today });

    if (existing) {
      existing.words = words;
      await existing.save();
    } else {
      const newVocab = new Vocabulary({ date: today, words });
      await newVocab.save();
    }

    res.status(200).json({ message: "Vocabulary uploaded successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload vocabulary.", error });
  }
};

// Get today's vocabulary
exports.getVocabulary = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const vocab = await Vocabulary.findOne({ date: today });

    if (vocab) {
      res.status(200).json({ words: vocab.words });
    } else {
      res.status(404).json({ message: "Vocabulary not found for today." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving vocabulary.", error });
  }
};
