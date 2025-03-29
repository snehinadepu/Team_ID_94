const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { requireAuth } = require('@clerk/express');

// Add new product (Protected Route)
router.post('/add', requireAuth(), async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all products (Public Route)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
