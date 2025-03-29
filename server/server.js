const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { requireAuth } = require('@clerk/express'); // ✅ Correct import for Clerk middleware
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Protected Route (using requireAuth middleware)
app.get('/api/protected', requireAuth(), (req, res) => {  // Note: Call requireAuth() as a function
    const userId = req.auth.userId;  // Extract userId from the request object
    if (userId) {
        res.json({ message: `Welcome, authenticated user with ID: ${userId}` });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
