import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: 20000,
        fabric: 'All',
        occasion: 'All'
    });
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/api/products', { timeout: 3000 });
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

                {/* Search & Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto mb-12 space-y-4"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search sarees by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent text-white placeholder-gray-400 pl-12 pr-4 py-4 focus:outline-none"
                            />
                        </div>
                        <motion.button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-6 py-4 rounded-2xl border transition-all flex items-center gap-2 font-semibold ${showFilters
                                ? 'bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/20'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            Filters
                        </motion.button>
                        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden min-w-[200px]">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-transparent text-white px-4 py-4 focus:outline-none appearance-none cursor-pointer"
                            >
                                <option value="newest" className="bg-gray-800">Newest First</option>
                                <option value="price-low" className="bg-gray-800">Price: Low to High</option>
                                <option value="price-high" className="bg-gray-800">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Price Range */}
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-3 font-medium">Max Price: ₹{filters.priceRange}</label>
                                        <input
                                            type="range"
                                            min="500"
                                            max="30000"
                                            step="500"
                                            value={filters.priceRange}
                                            onChange={(e) => setFilters({ ...filters, priceRange: parseInt(e.target.value) })}
                                            className="w-full accent-red-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                                            <span>₹500</span>
                                            <span>₹30000</span>
                                        </div>
                                    </div>

                                    {/* Fabric Filter */}
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-3 font-medium">Fabric</label>
                                        <select
                                            value={filters.fabric}
                                            onChange={(e) => setFilters({ ...filters, fabric: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                                        >
                                            <option value="All" className="bg-gray-800">All Fabrics</option>
                                            {[...new Set(products.map(p => p.fabric))].filter(Boolean).map(f => (
                                                <option key={f} value={f} className="bg-gray-800">{f}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Occasion Filter */}
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-3 font-medium">Occasion</label>
                                        <select
                                            value={filters.occasion}
                                            onChange={(e) => setFilters({ ...filters, occasion: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                                        >
                                            <option value="All" className="bg-gray-800">All Occasions</option>
                                            {[...new Set(products.map(p => p.occasion))].filter(Boolean).map(o => (
                                                <option key={o} value={o} className="bg-gray-800">{o}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                    {products
                        .filter(product => {
                            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
                            const matchesFabric = filters.fabric === 'All' || product.fabric === filters.fabric;
                            const matchesOccasion = filters.occasion === 'All' || product.occasion === filters.occasion;
                            const matchesPrice = product.price <= filters.priceRange;
                            return matchesSearch && matchesFabric && matchesOccasion && matchesPrice;
                        })
                        .sort((a, b) => {
                            if (sortBy === 'price-low') return a.price - b.price;
                            if (sortBy === 'price-high') return b.price - a.price;
                            if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
                            return 0;
                        })
                        .map((product, index) => (
                            <TiltCard key={product._id} product={product} index={index} />
                        ))}
                </div>

                {/* Empty State */}
                {products.filter(product => {
                    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesFabric = filters.fabric === 'All' || product.fabric === filters.fabric;
                    const matchesOccasion = filters.occasion === 'All' || product.occasion === filters.occasion;
                    const matchesPrice = product.price <= filters.priceRange;
                    return matchesSearch && matchesFabric && matchesOccasion && matchesPrice;
                }).length === 0 && (
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
