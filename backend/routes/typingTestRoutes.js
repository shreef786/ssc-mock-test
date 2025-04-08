// backend/routes/typingTestRoutes.js
const express = require("express");
const router = express.Router();
const { uploadTypingText, getTypingText } = require("../controllers/typingTestController");

// Upload typing test text
router.post("/upload", uploadTypingText);

// Get current typing test text
router.get("/", getTypingText);

module.exports = router;
