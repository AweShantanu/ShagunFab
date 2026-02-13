import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Sparkles, CheckCircle2, Package, Palette, Tag } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(false);

    // Magnifier states
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [[x, y], setXY] = useState([0, 0]);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                const fallbackProducts = [
                    { _id: '1', name: 'Banarasi Silk Saree', price: 5000, images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80'], description: 'Pure silk with gold zari.', fabric: 'Silk', color: 'Red', occasion: 'Wedding', stock: 10 },
                    { _id: '2', name: 'Cotton Party Wear', price: 2500, images: ['https://images.unsplash.com/photo-1583391725988-6490d8078752?w=500&q=80'], description: 'Elegant cotton saree.', fabric: 'Cotton', color: 'Blue', occasion: 'Party', stock: 15 },
                    { _id: '3', name: 'Kanjivaram Blue', price: 8000, images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&q=80'], description: 'Royal blue Kanjivaram.', fabric: 'Silk', color: 'Blue', occasion: 'Wedding', stock: 5 },
                    { _id: '4', name: 'Georgette Floral', price: 1800, images: ['https://images.unsplash.com/photo-1518112390430-f4ab02e9c2c8?w=500&q=80'], description: 'Lightweight floral print.', fabric: 'Georgette', color: 'Pink', occasion: 'Casual', stock: 20 },
                ];
                const found = fallbackProducts.find(p => p._id === id);
                if (found) setProduct(found);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center backdrop-blur-xl bg-white/5 border border-white/10 p-12 rounded-3xl"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Product not found</h2>
                    <Link to="/shop" className="text-red-400 hover:text-red-300 underline text-lg">
                        Return to Shop
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 50, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.4, 1],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Shop
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Image Section - Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative cursor-zoom-in">
                            <motion.img
                                src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/500'}
                                alt={product.name}
                                className="w-full h-[600px] object-cover"
                                onMouseEnter={(e) => {
                                    const elem = e.currentTarget;
                                    const { width, height } = elem.getBoundingClientRect();
                                    setSize([width, height]);
                                    setShowMagnifier(true);
                                }}
                                onMouseMove={(e) => {
                                    const elem = e.currentTarget;
                                    const { top, left } = elem.getBoundingClientRect();
                                    const x = e.pageX - left - window.pageXOffset;
                                    const y = e.pageY - top - window.pageYOffset;
                                    setXY([x, y]);
                                }}
                                onMouseLeave={() => setShowMagnifier(false)}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Magnifier Overlay */}
                            <AnimatePresence>
                                {showMagnifier && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="pointer-events-none absolute border-2 border-white/20 rounded-full shadow-2xl overflow-hidden z-50"
                                        style={{
                                            height: '200px',
                                            width: '200px',
                                            top: `${y - 100}px`,
                                            left: `${x - 100}px`,
                                            backgroundImage: `url('${product.images?.[0] || 'https://via.placeholder.com/500'}')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: `${imgWidth * 2.5}px ${imgHeight * 2.5}px`,
                                            backgroundPosition: `-${x * 2.5 - 100}px -${y * 2.5 - 100}px`
                                        }}
                                    />
                                )}
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Video Demonstration Section */}
                        {product.video && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-4"
                            >
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-yellow-400" />
                                    Fabric Demonstration
                                </h3>
                                <div className="aspect-video bg-black rounded-2xl overflow-hidden relative">
                                    <video
                                        src={product.video}
                                        controls
                                        className="w-full h-full object-cover"
                                        poster={product.images?.[0]}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Decorative Border */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10 group-hover:blur-3xl transition-all duration-500" />
                    </motion.div>

                    {/* Details Section - Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full blur-3xl -z-10" />

                        <motion.h1
                            className="text-4xl font-bold text-white mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {product.name}
                        </motion.h1>

                        <motion.div
                            className="flex items-center gap-3 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                                ₹{product.price}
                            </span>
                            <Sparkles className="w-6 h-6 text-yellow-400" />
                        </motion.div>

                        <motion.p
                            className="text-gray-300 leading-relaxed mb-8 text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {product.description}
                        </motion.p>

                        {/* Product Specs - Glassmorphism Cards */}
                        <motion.div
                            className="grid grid-cols-2 gap-4 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {[
                                { icon: Package, label: 'Fabric', value: product.fabric || 'N/A' },
                                { icon: Palette, label: 'Color', value: product.color || 'N/A' },
                                { icon: Tag, label: 'Occasion', value: product.occasion || 'N/A' },
                                { icon: CheckCircle2, label: 'Stock', value: product.stock > 0 ? 'In Stock' : 'Out of Stock' },
                            ].map((spec, idx) => {
                                const Icon = spec.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="backdrop-blur-sm bg-white/5 border border-white/10 p-4 rounded-xl"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon className="w-4 h-4 text-red-400" />
                                            <span className="text-gray-400 text-sm">{spec.label}</span>
                                        </div>
                                        <span className="font-semibold text-white">{spec.value}</span>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Add to Cart Button */}
                        <motion.button
                            onClick={handleAddToCart}
                            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-2xl shadow-red-600/30 flex items-center justify-center gap-2 relative overflow-hidden group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span className="relative z-10 flex items-center gap-2 text-lg">
                                {addedToCart ? (
                                    <>
                                        <CheckCircle2 className="w-6 h-6" />
                                        Added to Cart!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-6 h-6" />
                                        Add to Cart
                                    </>
                                )}
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                                initial={{ x: '100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>

                        {/* Success Animation Overlay */}
                        {addedToCart && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-3xl pointer-events-none"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                                >
                                    <CheckCircle2 className="w-10 h-10 text-white" />
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
