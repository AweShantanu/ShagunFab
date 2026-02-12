import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products', { timeout: 3000 });
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    throw new Error("No data");
                }
            } catch (error) {
                console.error("Fetch failed or empty, using fallback:", error.message);
                // Fallback data
                setProducts([
                    { _id: '1', name: 'Banarasi Silk Saree', price: 5000, images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80'], description: 'Pure silk with gold zari.' },
                    { _id: '2', name: 'Cotton Party Wear', price: 2500, images: ['https://images.unsplash.com/photo-1583391725988-6490d8078752?w=500&q=80'], description: 'Elegant cotton saree.' },
                    { _id: '3', name: 'Kanjivaram Blue', price: 8000, images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&q=80'], description: 'Royal blue Kanjivaram.' },
                    { _id: '4', name: 'Georgette Floral', price: 1800, images: ['https://images.unsplash.com/photo-1518112390430-f4ab02e9c2c8?w=500&q=80'], description: 'Lightweight floral print.' },
                    { _id: '5', name: 'Red Silk Wedding', price: 12000, images: ['https://images.unsplash.com/photo-1548842456-4b95d03a1103?w=500&q=80'], description: 'Premium wedding collection.' },
                    { _id: '6', name: 'Green Chanderi', price: 3500, images: ['https://images.unsplash.com/photo-1617627961939-cca47e2b0e73?w=500&q=80'], description: 'Lightweight Chanderi silk.' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // 3D Tilt Card Component
    const TiltCard = ({ product, index }) => {
        const ref = useRef(null);
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const mouseXSpring = useSpring(x);
        const mouseYSpring = useSpring(y);

        const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
        const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

        const handleMouseMove = (e) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                }}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative"
            >
                {/* Shimmer Effect Background */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{
                            x: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.2,
                        }}
                    />
                </div>

                {/* Card Container */}
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Image Container with Hover Effects */}
                    <div className="relative h-72 overflow-hidden">
                        <motion.img
                            src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            whileHover={{
                                scale: 1.1,
                                filter: "brightness(1.2)",
                            }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Quick View Button */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                        >
                            <Link
                                to={`/product/${product._id}`}
                                className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white transition-colors"
                            >
                                Quick View
                            </Link>
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            className="absolute top-4 right-4"
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                Premium
                            </div>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6" style={{ transform: "translateZ(20px)" }}>
                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                            {product.name}
                        </h2>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {product.description}
                        </p>

                        {/* Price Section */}
                        <div className="flex items-center justify-between">
                            <motion.div
                                className="flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                                    ₹{product.price}
                                </span>
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                            </motion.div>

                            {/* View Details Link */}
                            <Link
                                to={`/product/${product._id}`}
                                className="text-red-400 hover:text-red-300 font-medium text-sm flex items-center gap-1 group/link"
                            >
                                View
                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </Link>
                        </div>
                    </div>

                    {/* Background Glow Effect */}
                    <motion.div
                        className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                </div>
            </motion.div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Our Collection
                        </span>
                    </motion.h1>

                    {/* Animated Underline */}
                    <motion.div
                        className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={{ width: "200px" }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    />

                    <p className="text-gray-400 text-lg">Discover timeless elegance</p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto mb-12"
                >
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search sarees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent text-white placeholder-gray-400 pl-12 pr-4 py-4 focus:outline-none"
                        />
                    </div>
                </motion.div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                    {products
                        .filter(product =>
                            product.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((product, index) => (
                            <TiltCard key={product._id} product={product} index={index} />
                        ))}
                </div>

                {/* Empty State */}
                {products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-gray-400 text-xl">No products found</p>
                        </motion.div>
                    )}
            </div>
        </div>
    );
};

export default Shop;
