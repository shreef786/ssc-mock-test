const express = require('express');
const router = express.Router();
const Editorial = require('../models/Editorial');

// Upload new editorial
router.post('/upload', async (req, res) => {
  try {
    const editorial = new Editorial(req.body);
    await editorial.save();
    res.status(201).json({ message: 'Editorial uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload editorial' });
  }
});

// Get latest editorial
router.get('/latest', async (req, res) => {
  try {
    const latest = await Editorial.findOne().sort({ date: -1 });
    res.status(200).json(latest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest editorial' });
  }
});

// Get last 7 editorials
router.get('/previous', async (req, res) => {
  try {
    const previous = await Editorial.find().sort({ date: -1 }).limit(7);
    res.status(200).json(previous);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch previous editorials' });
  }
});

module.exports = router;
