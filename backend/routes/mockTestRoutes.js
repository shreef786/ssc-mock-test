const express = require('express');
const router = express.Router();
const MockTest = require('../models/MockTest');

// Create Mock Test
router.post('/upload', async (req, res) => {
  try {
    const newTest = new MockTest(req.body);
    await newTest.save();
    res.status(201).json({ message: 'Mock test uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload mock test' });
  }
});

// Get all mock tests
router.get('/all', async (req, res) => {
  try {
    const tests = await MockTest.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mock tests' });
  }
});

// Get test by ID
router.get('/:id', async (req, res) => {
  try {
    const test = await MockTest.findById(req.params.id);
    res.status(200).json(test);
  } catch (error) {
    res.status(404).json({ error: 'Test not found' });
  }
});

module.exports = router;
