import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api';
import { motion } from 'framer-motion';
import { MapPin, User, Phone, Mail, CreditCard, CheckCircle2, Sparkles } from 'lucide-react';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'India',
        phone: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = 0;
    const taxPrice = 0;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    image: item.images && item.images.length > 0 ? item.images[0] : (item.image || 'https://via.placeholder.com/150'),
                    price: item.price,
                    qty: item.qty
                })),
                shippingAddress: formData,
                paymentMethod: 'WhatsApp',
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            await api.post('/api/orders', orderData, config);

            const itemsList = cartItems.map((item, index) =>
                `${index + 1}. ${item.name} (x${item.qty}) - ₹${item.price * item.qty}`
            ).join('%0a');

            const message = `*New Order Request* %0a%0a` +
                `*Name:* ${formData.name}%0a` +
                `*Phone:* ${formData.phone}%0a` +
                `*Address:* ${formData.address}, ${formData.city}, ${formData.postalCode}%0a%0a` +
                `*Items:*%0a${itemsList}%0a%0a` +
                `*Total Amount:* ₹${totalPrice}%0a%0a` +
                `Please confirm my order.`;

            const whatsappUrl = `https://wa.me/919431612753?text=${message}`;

            clearCart();
            window.open(whatsappUrl, '_blank');
            navigate('/');

        } catch (error) {
            console.error(error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
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
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        Checkout
                    </h1>
                    <p className="text-gray-400 text-lg">Complete your order</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* Shipping Form - Glassmorphism */}
                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full blur-3xl -z-10" />

                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-red-400" />
                            Shipping Details
                        </h2>

                        <form onSubmit={submitHandler} id="checkout-form" className="space-y-5">
                            {/* Name Field */}
                            <div className="relative">
                                <motion.input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-transparent focus:border-red-500/50 focus:outline-none transition-all peer"
                                    placeholder="Full Name"
                                    whileFocus={{ scale: 1.01 }}
                                />
                                <label className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-400">
                                    <User className="w-3 h-3 inline mr-1" />
                                    Full Name
                                </label>
                            </div>

                            {/* Address Field */}
                            <div className="relative">
                                <motion.input
                                    type="text"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-transparent focus:border-red-500/50 focus:outline-none transition-all peer"
                                    placeholder="Address"
                                    whileFocus={{ scale: 1.01 }}
                                />
                                <label className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-400">
                                    Full Address
                                </label>
                            </div>

                            {/* City & Postal Code */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <motion.input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-transparent focus:border-red-500/50 focus:outline-none transition-all peer"
                                        placeholder="City"
                                        whileFocus={{ scale: 1.01 }}
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-400">
                                        City
                                    </label>
                                </div>
                                <div className="relative">
                                    <motion.input
                                        type="text"
                                        name="postalCode"
                                        required
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-transparent focus:border-red-500/50 focus:outline-none transition-all peer"
                                        placeholder="Postal Code"
                                        whileFocus={{ scale: 1.01 }}
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-400">
                                        Postal Code
                                    </label>
                                </div>
                            </div>

                            {/* Phone Field */}
                            <div className="relative">
                                <motion.input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-transparent focus:border-red-500/50 focus:outline-none transition-all peer"
                                    placeholder="Phone Number"
                                    whileFocus={{ scale: 1.01 }}
                                />
                                <label className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-400">
                                    <Phone className="w-3 h-3 inline mr-1" />
                                    Phone Number
                                </label>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary & Payment */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10" />

                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <CreditCard className="w-6 h-6 text-purple-400" />
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        className="flex justify-between items-center backdrop-blur-sm bg-white/5 rounded-lg p-3"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="flex-1">
                                            <span className="text-white font-medium text-sm block">{item.name}</span>
                                            <span className="text-gray-400 text-xs">Qty: {item.qty}</span>
                                        </div>
                                        <span className="font-bold text-white">₹{item.price * item.qty}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-3">
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">₹{itemsPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Shipping</span>
                                    <span className="text-green-400 font-semibold">Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-2xl text-white pt-3 border-t border-white/10">
                                    <span>Total</span>
                                    <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-1">
                                        ₹{totalPrice}
                                        <Sparkles className="w-5 h-5 text-yellow-400" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-6 rounded-2xl">
                            <div className="flex items-start gap-3 mb-4">
                                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                                <div>
                                    <h3 className="text-white font-semibold mb-1">WhatsApp Checkout</h3>
                                    <p className="text-sm text-gray-300">
                                        Complete your order via WhatsApp. You'll be redirected to chat with our team to confirm payment & delivery.
                                    </p>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-2xl shadow-green-600/30 flex items-center justify-center gap-2 relative overflow-hidden ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                whileHover={!loading ? { scale: 1.02 } : {}}
                                whileTap={!loading ? { scale: 0.98 } : {}}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {loading ? (
                                        <>
                                            <motion.div
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            Order via WhatsApp
                                        </>
                                    )}
                                </span>
                                {!loading && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600"
                                        initial={{ x: '100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(220, 38, 38, 0.5);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default Checkout;
