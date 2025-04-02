import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Registration Route
router.post('/register', registerUser);

// User Login Route
router.post('/login', loginUser);

// Get User Profile (Protected Route)
router.get('/profile', authMiddleware, getUserProfile);

export default router;
