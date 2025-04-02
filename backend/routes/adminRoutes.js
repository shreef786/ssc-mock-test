import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';
import { getAllUsers, deleteUser, updateUserRole } from '../controllers/adminController.js';

const router = express.Router();

// Get All Registered Users (Admin Only)
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

// Delete a User by ID (Admin Only)
router.delete('/user/:id', authMiddleware, adminMiddleware, deleteUser);

// Update User Role (Admin Only)
router.put('/user/:id', authMiddleware, adminMiddleware, updateUserRole);

export default router;
