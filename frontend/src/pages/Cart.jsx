import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
                {/* Floating Background Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, 50, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.4, 1],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md mx-auto backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-12 rounded-3xl shadow-2xl text-center relative z-10"
                >
                    {/* Icon with Animation */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10"
                    >
                        <ShoppingBag className="w-12 h-12 text-red-400" />
                    </motion.div>

                    <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                        Your Cart is Empty
                    </h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Looks like you haven't added any sarees to your collection yet.
                    </p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl shadow-red-600/30 relative overflow-hidden group"
                        >
                            <span className="relative z-10">Start Shopping</span>
                            <Sparkles className="w-5 h-5 relative z-10" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                                initial={{ x: '100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 100, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, -100, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-400 text-lg">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-2xl shadow-xl relative overflow-hidden"
                            >
                                {/* Hover Glow */}
                                <motion.div
                                    className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />

                                <div className="flex items-center gap-6 relative z-10">
                                    {/* Image */}
                                    <motion.div
                                        className="relative rounded-xl overflow-hidden"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <img
                                            src={item.images && item.images.length > 0 ? item.images[0] : (item.image || 'https://via.placeholder.com/150')}
                                            alt={item.name}
                                            className="w-28 h-28 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    </motion.div>

                                    {/* Details */}
                                    <div className="flex-grow">
                                        <Link
                                            to={`/product/${item._id}`}
                                            className="text-xl font-semibold text-white hover:text-red-300 transition-colors block mb-2"
                                        >
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-gray-400 mb-3">
                                            {item.fabric || 'Premium Fabric'} • {item.color || 'Elegant Color'}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                                                ₹{item.price}
                                            </span>
                                            <Sparkles className="w-4 h-4 text-yellow-400" />
                                        </div>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-4">
                                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-2 flex items-center gap-3">
                                            <motion.button
                                                onClick={() => addToCart(item, -1)}
                                                className="p-2 rounded-lg hover:bg-white/10 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                disabled={item.qty <= 1}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </motion.button>
                                            <span className="font-bold text-white w-8 text-center text-lg">{item.qty}</span>
                                            <motion.button
                                                onClick={() => addToCart(item, 1)}
                                                className="p-2 rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </motion.button>
                                        </div>

                                        {/* Remove Button */}
                                        <motion.button
                                            onClick={() => removeFromCart(item._id)}
                                            className="p-3 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors backdrop-blur-sm"
                                            title="Remove item"
                                            whileHover={{ scale: 1.1, rotate: 10 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary - Glassmorphism */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 p-8 rounded-3xl shadow-2xl sticky top-24 relative overflow-hidden">
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full blur-3xl -z-10" />

                            <h2 className="text-2xl font-bold text-white mb-8 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-300 text-lg">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">₹{calculateTotal()}</span>
                                </div>
                                <div className="flex justify-between text-gray-300 text-lg">
                                    <span>Shipping</span>
                                    <span className="text-green-400 font-semibold">Free</span>
                                </div>
                                <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-2xl text-white">
                                    <span>Total</span>
                                    <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                                        ₹{calculateTotal()}
                                    </span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <motion.button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-2xl shadow-red-600/30 flex items-center justify-center gap-2 group relative overflow-hidden mb-4"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                                    initial={{ x: '100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>

                            {/* Security Badge */}
                            <div className="text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                Secure Checkout powered by UPI
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
