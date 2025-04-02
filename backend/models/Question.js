import db from '../config/db.js';

// Create Questions Table (If not exists)
const createQuestionsTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        test_id INT NOT NULL,
        question_text TEXT NOT NULL,
        option_a VARCHAR(255) NOT NULL,
        option_b VARCHAR(255) NOT NULL,
        option_c VARCHAR(255) NOT NULL,
        option_d VARCHAR(255) NOT NULL,
        correct_option CHAR(1) NOT NULL,
        FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
    )`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating questions table:', err);
        } else {
            console.log('Questions table is ready');
        }
    });
};

// Insert New Question
export const createQuestion = (test_id, question_text, option_a, option_b, option_c, option_d, correct_option, callback) => {
    const sql = `INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [test_id, question_text, option_a, option_b, option_c, option_d, correct_option], callback);
};

// Get All Questions of a Test
export const getQuestionsByTestId = (test_id, callback) => {
    const sql = `SELECT * FROM questions WHERE test_id = ?`;
    db.query(sql, [test_id], callback);
};

// Delete Question
export const deleteQuestion = (id, callback) => {
    const sql = `DELETE FROM questions WHERE id = ?`;
    db.query(sql, [id], callback);
};

// Initialize Table
createQuestionsTable();
