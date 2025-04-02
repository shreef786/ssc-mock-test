import db from '../config/db.js';

// Admin Login
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [admins] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);
        if (admins.length === 0) return res.status(401).json({ message: 'Admin not found' });

        const admin = admins[0];
        if (password !== admin.password) return res.status(401).json({ message: 'Incorrect password' });

        res.json({ message: 'Admin login successful', admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create New Admin
export const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const [existingAdmins] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);
        if (existingAdmins.length > 0) return res.status(400).json({ message: 'Admin already exists' });

        await db.execute('INSERT INTO admins (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await db.execute('DELETE FROM users WHERE id = ?', [userId]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Tests (Admin)
export const getAllTestsAdmin = async (req, res) => {
    try {
        const [tests] = await db.execute('SELECT * FROM tests');
        res.json(tests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Test
export const deleteTestAdmin = async (req, res) => {
    const { testId } = req.params;
    try {
        await db.execute('DELETE FROM tests WHERE id = ?', [testId]);
        res.json({ message: 'Test deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
