import db from '../config/db.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Razorpay Instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order (Generate Payment Link)
export const createOrder = async (req, res) => {
    const { amount, currency, userId } = req.body;
    
    try {
        const options = {
            amount: amount * 100,  // Amount in paise
            currency,
            receipt: `receipt_${userId}_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        await db.execute('INSERT INTO payments (user_id, order_id, amount, status) VALUES (?, ?, ?, ?)', 
            [userId, order.id, amount, 'pending']
        );

        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Verify Payment Success
export const verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature, userId } = req.body;

    try {
        const body = `${order_id}|${payment_id}`;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature !== signature) {
            return res.status(400).json({ success: false, message: 'Payment verification failed' });
        }

        await db.execute('UPDATE payments SET status = ?, payment_id = ? WHERE order_id = ?', 
            ['success', payment_id, order_id]
        );
        
        await db.execute('UPDATE users SET subscription_status = ?, subscription_expiry = DATE_ADD(NOW(), INTERVAL 1 YEAR) WHERE id = ?', 
            ['active', userId]
        );

        res.json({ success: true, message: 'Payment verified and subscription activated' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Fetch User Payment History
export const getUserPayments = async (req, res) => {
    const { userId } = req.params;
    
    try {
        const [payments] = await db.execute('SELECT * FROM payments WHERE user_id = ?', [userId]);
        res.json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Admin View: Get All Payments
export const getAllPayments = async (req, res) => {
    try {
        const [payments] = await db.execute('SELECT * FROM payments');
        res.json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
