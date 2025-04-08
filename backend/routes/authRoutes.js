// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

router.post("/login", async (req, res) => {
  const { adminId, password } = req.body;

  const expectedAdminId = "admin123";
  const expectedPassword = "securepass123";

  if (adminId === expectedAdminId && password === expectedPassword) {
    res.status(200).json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
