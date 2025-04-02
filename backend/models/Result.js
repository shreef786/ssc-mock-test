import db from '../config/db.js';

// Create Results Table (If not exists)
const createResultsTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        test_id INT NOT NULL,
        score INT NOT NULL,
        total_questions INT NOT NULL,
        correct_answers INT NOT NULL,
        attempted_questions INT NOT NULL,
        percentage FLOAT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
    )`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating results table:', err);
        } else {
            console.log('Results table is ready');
        }
    });
};

// Insert New Test Result
export const saveTestResult = (user_id, test_id, score, total_questions, correct_answers, attempted_questions, percentage, callback) => {
    const sql = `INSERT INTO results (user_id, test_id, score, total_questions, correct_answers, attempted_questions, percentage) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [user_id, test_id, score, total_questions, correct_answers, attempted_questions, percentage], callback);
};

// Get User Test Results
export const getUserResults = (user_id, callback) => {
    const sql = `SELECT * FROM results WHERE user_id = ? ORDER BY timestamp DESC`;
    db.query(sql, [user_id], callback);
};

// Get Specific Test Result
export const getTestResult = (user_id, test_id, callback) => {
    const sql = `SELECT * FROM results WHERE user_id = ? AND test_id = ?`;
    db.query(sql, [user_id, test_id], callback);
};

// Delete Result (Admin or User Request)
export const deleteResult = (id, callback) => {
    const sql = `DELETE FROM results WHERE id = ?`;
    db.query(sql, [id], callback);
};

// Initialize Table
createResultsTable();
