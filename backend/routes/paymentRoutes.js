import express from 'express';
import { processPayment, verifyPayment } from '../controllers/paymentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Initiate Payment (User must be logged in)
router.post('/pay', authMiddleware, processPayment);

// Verify Payment Status (After payment is completed)
router.post('/verify', authMiddleware, verifyPayment);

export default router;
