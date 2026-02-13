const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    fabric: { type: String, required: true },
    color: { type: String, required: true },
    occasion: { type: String, required: true }, // Wedding, Casual, Party
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, required: true, default: 'Saree', enum: ['Saree', 'Lehenga'] },
    stock: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
