import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Shield, Truck, Star } from 'lucide-react';
import api from '../api';

const Home = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, -50]);
    const y2 = useTransform(scrollY, [0, 300], [0, 100]);
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);

    // Floating particles
    const Particle = ({ delay, duration, x, y }) => (
        <motion.div
            className="absolute w-2 h-2 bg-gradient-to-r from-red-400/30 to-pink-400/30 rounded-full blur-sm"
            initial={{ x: x, y: y, opacity: 0 }}
            animate={{
                x: [x, x + Math.random() * 100 - 50],
                y: [y, y - 100],
                opacity: [0, 1, 0],
            }}
            transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );

    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/api/products');
                setFeaturedProducts(data.slice(0, 4));
            } catch (error) {
                setFeaturedProducts([
                    { _id: '1', name: 'Banarasi Silk Saree', price: 5000, images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80'] },
                    { _id: '2', name: 'Cotton Party Wear', price: 2500, images: ['https://images.unsplash.com/photo-1583391725988-6490d8078752?w=500&q=80'] },
                    { _id: '3', name: 'Kanjivaram Blue', price: 8000, images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&q=80'] },
                    { _id: '4', name: 'Georgette Floral', price: 1800, images: ['https://images.unsplash.com/photo-1518112390430-f4ab02e9c2c8?w=500&q=80'] },
                ]);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="overflow-hidden">
            {/* Hero Section with Saree Background Images */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Saree Images Grid with Parallax */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 grid grid-cols-3 gap-2 p-2 opacity-40">
                        <img
                            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
                            alt="Saree"
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1583391733975-5e8c6f9f0b4d?w=800&q=80"
                            alt="Saree"
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80"
                            alt="Saree"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: y2 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 grid grid-cols-3 gap-2 p-2 opacity-30 translate-y-20">
                        <img
                            src="https://images.unsplash.com/photo-1583391725988-6490d8078752?w=800&q=80"
                            alt="Saree"
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1606913084603-3e7702b01627?w=800&q=80"
                            alt="Saree"
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1518112390430-f4ab02e9c2c8?w=800&q=80"
                            alt="Saree"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                </motion.div>

                {/* Lighter Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/70 to-gray-900/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />

                {/* Animated Gradient Glow */}
                <motion.div
                    className="absolute inset-0 opacity-50"
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
                            'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                            'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)',
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <Particle
                            key={i}
                            delay={i * 0.5}
                            duration={4 + Math.random() * 3}
                            x={Math.random() * window.innerWidth}
                            y={Math.random() * window.innerHeight}
                        />
                    ))}
                </div>

                {/* Hero Content */}
                <motion.div
                    className="relative z-10 text-center px-4 max-w-5xl mx-auto"
                    style={{ opacity }}
                >
                    {/* Animated Title with Glow */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                    >
                        {["Elegance", " ", "Woven", " ", "in", " ", "Every", " ", "Thread"].map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="inline-block bg-gradient-to-r from-red-400 via-pink-300 to-purple-400 bg-clip-text text-transparent"
                                style={{
                                    filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.3))',
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-lg md:text-2xl text-gray-300 mb-10 font-light tracking-wide"
                    >
                        Discover the finest collection of traditional and contemporary sarees
                    </motion.p>

                    {/* CTA Button with Ripple Effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/shop"
                            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg overflow-hidden shadow-2xl shadow-red-600/30"
                        >
                            <span className="relative z-10">Shop Now</span>
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

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            className="w-1 h-2 bg-white/60 rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Features Section with Glassmorphism */}
            <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
                {/* Ambient Background Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, -30, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-gray-400 text-lg">Experience luxury with every thread</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Authentic Quality",
                                desc: "Handpicked fabrics directly from master weavers",
                                gradient: "from-red-500/20 to-pink-500/20"
                            },
                            {
                                icon: Truck,
                                title: "Pan-India Delivery",
                                desc: "Fast and secure shipping across India",
                                gradient: "from-purple-500/20 to-pink-500/20"
                            },
                            {
                                icon: Star,
                                title: "Premium Collection",
                                desc: "Curated selection of traditional and modern designs",
                                gradient: "from-pink-500/20 to-red-500/20"
                            }
                        ].map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        y: -10,
                                        transition: { duration: 0.2 }
                                    }}
                                    transition={{ delay: idx * 0.2 }}
                                    viewport={{ once: true }}
                                    className="group relative"
                                >
                                    {/* Glassmorphism Card */}
                                    <div className={`relative backdrop-blur-xl bg-gradient-to-br ${feature.gradient} border border-white/10 p-8 rounded-3xl shadow-2xl overflow-hidden`}>
                                        {/* Gradient Border Animation */}
                                        <motion.div
                                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                background: 'linear-gradient(45deg, transparent, rgba(220, 38, 38, 0.3), transparent)',
                                                backgroundSize: '200% 200%',
                                            }}
                                            animate={{
                                                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />

                                        {/* Icon with Rotation Animation */}
                                        <motion.div
                                            className="mb-6 inline-block"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                        </motion.div>

                                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-300 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {feature.desc}
                                        </p>

                                        {/* Hover Glow Effect */}
                                        <motion.div
                                            className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Collection Preview */}
            <section className="py-24 bg-gray-800">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Featured Collection
                        </h2>
                        <p className="text-gray-400 text-lg">Handpicked just for you</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {featuredProducts.slice(0, 4).map((product, idx) => (
                            <motion.div
                                key={product._id || idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    to={`/product/${product._id}`}
                                    className="relative rounded-2xl overflow-hidden group cursor-pointer block"
                                >
                                    <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
                                        <img
                                            src={product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80'}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="backdrop-blur-sm bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                                                <span className="text-white font-semibold">View Details</span>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-white font-semibold truncate">{product.name}</p>
                                            <p className="text-red-300 font-bold">₹{product.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-lg group"
                        >
                            View All Collections
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
