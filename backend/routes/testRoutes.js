// backend/routes/testRoutes.js
const express = require("express");
const router = express.Router();
const { addMockTest, getMockTests } = require("../controllers/testController");

// Upload a new mock test
router.post("/upload", addMockTest);

// Get all mock tests
router.get("/all", getMockTests);

module.exports = router;
