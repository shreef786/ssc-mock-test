// backend/routes/vocabularyRoutes.js
const express = require("express");
const router = express.Router();
const { uploadVocabulary, getVocabulary } = require("../controllers/vocabularyController");

// Upload daily vocabulary
router.post("/upload", uploadVocabulary);

// Get latest and previous vocabulary
router.get("/all", getVocabulary);

module.exports = router;
