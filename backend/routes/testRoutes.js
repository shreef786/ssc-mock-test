import express from 'express';
import { createTest, getAllTests, getTestById } from '../controllers/testController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a New Mock Test (Admin Only)
router.post('/create', authMiddleware, adminMiddleware, createTest);

// Get All Available Mock Tests
router.get('/all', getAllTests);

// Get Test Details by ID
router.get('/:id', getTestById);

export default router;
