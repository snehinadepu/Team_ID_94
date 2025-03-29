const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { requireAuth } = require('@clerk/express');

// Create new order (Protected Route)
router.post('/add', requireAuth(), async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all orders (Protected Route)
router.get('/', requireAuth(), async (req, res) => {
    try {
        const orders = await Order.find().populate('productId userId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
