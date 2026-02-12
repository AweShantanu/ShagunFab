import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Award, Users, TrendingUp, CheckCircle2 } from 'lucide-react';

const About = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Banner with Animated Shapes */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Animated Background Gradient */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            'radial-gradient(circle at 30% 50%, rgba(220, 38, 38, 0.2) 0%, transparent 60%)',
                            'radial-gradient(circle at 70% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 60%)',
                            'radial-gradient(circle at 30% 50%, rgba(220, 38, 38, 0.2) 0%, transparent 60%)',
                        ]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />

                {/* Floating Geometric Shapes */}
                <motion.div
                    className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl rotate-45"
                    animate={{
                        y: [0, -30, 0],
                        rotate: [45, 65, 45],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        y: [0, 20, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Our Story
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Weaving tradition with modernity, one thread at a time
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section with Parallax */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                        {/* Image with Parallax */}
                        <motion.div
                            style={{ y: y1 }}
                            className="relative group"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1583391733975-5e6c9f0d5157?w=800&q=80"
                                    alt="Shagun Fabrics Heritage"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            {/* Decorative Border */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10 group-hover:blur-3xl transition-all duration-500" />
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Rooted in{' '}
                                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                                    Tradition
                                </span>
                            </h2>

                            <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Founded in the heart of <span className="text-red-400 font-semibold">Bhagalpur</span>,
                                    Shagun Fabrics has been a beacon of authentic handloom excellence for generations.
                                    Our journey began with a simple vision: to preserve the art of traditional weaving
                                    while embracing contemporary designs.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Each saree tells a story—woven by skilled artisans who have inherited their craft
                                    through generations. We work directly with master weavers, ensuring fair wages
                                    and supporting sustainable practices.
                                </motion.p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Reverse Layout */}
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Text Content (Left) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 md:order-1"
                        >
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Crafted with{' '}
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Passion
                                </span>
                            </h2>

                            <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                                <p>
                                    From selecting the finest threads to the final quality check, every step
                                    is executed with meticulous attention to detail. Our collection ranges from
                                    timeless Banarasi silks to contemporary cotton blends.
                                </p>
                                <p>
                                    We believe in transparency and authenticity. When you purchase from Shagun Fabrics,
                                    you're not just buying a saree—you're investing in heritage, supporting artisans,
                                    and becoming part of our story.
                                </p>
                            </div>
                        </motion.div>

                        {/* Image with Parallax (Right) */}
                        <motion.div
                            style={{ y: y2 }}
                            className="relative group order-1 md:order-2"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
                                    alt="Artisan Craftsmanship"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl -z-10 group-hover:blur-3xl transition-all duration-500" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section - Glassmorphism Cards */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Values
                        </h2>
                        <p className="text-gray-400 text-lg">What drives us every day</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Heart,
                                title: "Customer First",
                                desc: "Your satisfaction is our priority",
                                gradient: "from-red-500/20 to-pink-500/20"
                            },
                            {
                                icon: Award,
                                title: "Quality Assured",
                                desc: "Only the finest materials and craftsmanship",
                                gradient: "from-purple-500/20 to-pink-500/20"
                            },
                            {
                                icon: Users,
                                title: "Artisan Support",
                                desc: "Empowering weavers with fair trade",
                                gradient: "from-pink-500/20 to-red-500/20"
                            },
                            {
                                icon: TrendingUp,
                                title: "Innovation",
                                desc: "Blending tradition with modern style",
                                gradient: "from-red-500/20 to-purple-500/20"
                            }
                        ].map((value, idx) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="group relative"
                                >
                                    {/* Glassmorphism Card */}
                                    <div className={`relative backdrop-blur-xl bg-gradient-to-br ${value.gradient} border border-white/10 p-8 rounded-2xl h-full`}>
                                        {/* Icon */}
                                        <motion.div
                                            className="mb-6"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                        </motion.div>

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {value.desc}
                                        </p>

                                        {/* Hover Glow */}
                                        <motion.div
                                            className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline/Milestones Section */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Journey
                        </h2>
                        <p className="text-gray-400 text-lg">Milestones that shaped us</p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500/50 via-pink-500/50 to-purple-500/50" />

                        {[
                            { year: "1990", title: "Foundation", desc: "Started our journey in Bhagalpur" },
                            { year: "2005", title: "Expansion", desc: "Reached 50+ artisan partnerships" },
                            { year: "2015", title: "Digital", desc: "Launched online presence" },
                            { year: "2024", title: "Today", desc: "Serving customers pan-India" },
                        ].map((milestone, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className={`flex items-center mb-16 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className={`w-1/2 ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl inline-block"
                                    >
                                        <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                            {milestone.year}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                                        <p className="text-gray-400">{milestone.desc}</p>
                                    </motion.div>
                                </div>

                                {/* Timeline Dot */}
                                <motion.div
                                    className="w-6 h-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-500/50 z-10"
                                    whileHover={{ scale: 1.5 }}
                                />

                                <div className="w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-pink-500/10"
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Join Our Story
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Experience the beauty of authentic handloom sarees
                        </p>
                        <motion.a
                            href="/shop"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block bg-gradient-to-r from-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl shadow-red-600/30"
                        >
                            Explore Collection
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
