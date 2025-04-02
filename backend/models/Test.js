import db from '../config/db.js';

// Create Tests Table (If not exists)
const createTestsTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS tests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        duration INT NOT NULL,  -- Duration in minutes
        total_marks INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating tests table:', err);
        } else {
            console.log('Tests table is ready');
        }
    });
};

// Insert New Test
export const createTest = (title, description, duration, total_marks, callback) => {
    const sql = `INSERT INTO tests (title, description, duration, total_marks) VALUES (?, ?, ?, ?)`;
    db.query(sql, [title, description, duration, total_marks], callback);
};

// Get All Tests
export const getAllTests = (callback) => {
    const sql = `SELECT * FROM tests ORDER BY created_at DESC`;
    db.query(sql, callback);
};

// Get Test by ID
export const getTestById = (id, callback) => {
    const sql = `SELECT * FROM tests WHERE id = ?`;
    db.query(sql, [id], callback);
};

// Delete Test
export const deleteTest = (id, callback) => {
    const sql = `DELETE FROM tests WHERE id = ?`;
    db.query(sql, [id], callback);
};

// Initialize Table
createTestsTable();
