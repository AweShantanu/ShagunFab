const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Note: You'll need jsonwebtoken and bcryptjs for real auth implementation.
// For now, simple mock auth or placeholder.

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Check for database user OR hardcoded admin
        if ((user && user.password === password) || (email === 'admin@example.com' && password === '123456')) {
            res.json({
                _id: user ? user._id : 'admin_id',
                name: user ? user.name : 'Admin',
                email: email,
                isAdmin: true,
                token: 'dummy-token',
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        // Fallback for hardcoded admin in case of DB error
        if (email === 'admin@example.com' && password === '123456') {
            res.json({
                _id: 'admin_id',
                name: 'Admin',
                email: email,
                isAdmin: true,
                token: 'dummy-token',
            });
        } else {
            res.status(500).json({ message: 'Server Error during login' });
        }
    }
});

module.exports = router;
