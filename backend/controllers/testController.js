import db from '../config/db.js';

// Create a new test
export const createTest = async (req, res) => {
    const { title, description, duration, total_marks } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO tests (title, description, duration, total_marks) VALUES (?, ?, ?, ?)',
            [title, description, duration, total_marks]
        );
        res.status(201).json({ message: 'Test created successfully', testId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all tests
export const getAllTests = async (req, res) => {
    try {
        const [tests] = await db.execute('SELECT * FROM tests');
        res.json(tests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get test details by ID
export const getTestById = async (req, res) => {
    const { testId } = req.params;
    try {
        const [tests] = await db.execute('SELECT * FROM tests WHERE id = ?', [testId]);
        if (tests.length === 0) return res.status(404).json({ message: 'Test not found' });

        res.json(tests[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a test
export const deleteTest = async (req, res) => {
    const { testId } = req.params;
    try {
        await db.execute('DELETE FROM tests WHERE id = ?', [testId]);
        res.json({ message: 'Test deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
