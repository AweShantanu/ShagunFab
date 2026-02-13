const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');
const { cloudinary } = require('../config/cloudinary');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    const { name, price, fabric, color, occasion, description, images, video, category, stock } = req.body;

    const product = new Product({
        name,
        price,
        fabric,
        color,
        occasion,
        description,
        images,
        video,
        category,
        stock,
    });

    try {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Product Create Error:", error.message);
        res.status(400).json({ message: 'Invalid product data', error: error.message });
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    const { name, price, fabric, color, occasion, description, images, video, category, stock } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name;
            product.price = price;
            product.fabric = fabric;
            product.color = color;
            product.occasion = occasion;
            product.description = description;
            product.images = images;
            product.video = video;
            product.category = category;
            product.stock = stock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data' });
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            // Delete images from Cloudinary
            if (product.images && product.images.length > 0) {
                for (const imageUrl of product.images) {
                    if (imageUrl.includes('cloudinary.com')) {
                        const publicId = imageUrl.split('/').pop().split('.')[0];
                        const fullPublicId = `shagun_fabrics/${publicId}`;
                        await cloudinary.uploader.destroy(fullPublicId);
                    }
                }
            }

            // Delete video from Cloudinary
            if (product.video && product.video.includes('cloudinary.com')) {
                const publicId = product.video.split('/').pop().split('.')[0];
                const fullPublicId = `shagun_fabrics/${publicId}`;
                await cloudinary.uploader.destroy(fullPublicId, { resource_type: 'video' });
            }

            await product.deleteOne();
            res.json({ message: 'Product and associated media removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
