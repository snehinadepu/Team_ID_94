const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAuth } = require('@clerk/express');

// Create or update user (Protected Route)
router.post('/auth', requireAuth(), async (req, res) => {
    try {
        const { clerkId, name, email, role } = req.body;
        let user = await User.findOne({ clerkId });

        if (user) {
            user.name = name;
            user.email = email;
            user.role = role;
            await user.save();
        } else {
            user = new User({ clerkId, name, email, role });
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
