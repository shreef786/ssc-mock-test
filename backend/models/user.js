import db from '../config/db.js';

// Create Users Table (If not exists)
const createUsersTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table is ready');
        }
    });
};

// Insert New User (Registration)
export const registerUser = (name, email, hashedPassword, callback) => {
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.query(sql, [name, email, hashedPassword], callback);
};

// Get User by Email (For Login)
export const getUserByEmail = (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], callback);
};

// Get User by ID
export const getUserById = (id, callback) => {
    const sql = `SELECT id, name, email, is_admin, created_at FROM users WHERE id = ?`;
    db.query(sql, [id], callback);
};

// Initialize Table
createUsersTable();
