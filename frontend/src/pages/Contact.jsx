import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [copiedField, setCopiedField] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Floating Geometric Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                    style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                    animate={{
                        rotate: [0, 90, 180, 270, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-3xl rotate-45"
                    animate={{
                        y: [0, -40, 0],
                        rotate: [45, 65, 45],
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative pt-24 pb-12">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            We'd love to hear from you. Reach out for any queries or collaborations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {[
                                {
                                    icon: Phone,
                                    label: "Phone",
                                    value: "9431612753",
                                    link: "tel:9431612753",
                                    gradient: "from-red-500/20 to-pink-500/20"
                                },
                                {
                                    icon: Phone,
                                    label: "WhatsApp",
                                    value: "9431612753",
                                    link: "https://wa.me/919431612753",
                                    gradient: "from-green-500/20 to-emerald-500/20"
                                },
                                {
                                    icon: Mail,
                                    label: "Email",
                                    value: "anilbhgat006@gmail.com",
                                    link: "mailto:anilbhgat006@gmail.com",
                                    gradient: "from-purple-500/20 to-pink-500/20"
                                },
                                {
                                    icon: MapPin,
                                    label: "Address",
                                    value: "Bhagalpur, Bihar, India",
                                    link: null,
                                    gradient: "from-pink-500/20 to-red-500/20"
                                }
                            ].map((info, idx) => {
                                const Icon = info.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="group relative"
                                    >
                                        <div className={`backdrop-blur-xl bg-gradient-to-br ${info.gradient} border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden`}>
                                            {/* Icon with Bounce Animation */}
                                            <motion.div
                                                className="mb-4"
                                                whileHover={{
                                                    y: [0, -10, 0],
                                                    transition: { duration: 0.4 }
                                                }}
                                            >
                                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                            </motion.div>

                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-300 transition-colors">
                                                        {info.label}
                                                    </h3>
                                                    {info.link ? (
                                                        <a
                                                            href={info.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-300 hover:text-white transition-colors break-all"
                                                        >
                                                            {info.value}
                                                        </a>
                                                    ) : (
                                                        <p className="text-gray-300">{info.value}</p>
                                                    )}
                                                </div>

                                                {/* Copy Button */}
                                                {info.label !== 'Address' && (
                                                    <motion.button
                                                        onClick={() => handleCopy(info.value, info.label)}
                                                        className="text-gray-400 hover:text-white transition-colors p-2"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        {copiedField === info.label ? (
                                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                                        ) : (
                                                            <Copy className="w-5 h-5" />
                                                        )}
                                                    </motion.button>
                                                )}
                                            </div>

                                            {/* Background Glow on Hover */}
                                            <motion.div
                                                className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            />

                                            {/* Gradient Border Animation */}
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                style={{
                                                    background: 'linear-gradient(45deg, transparent, rgba(220, 38, 38, 0.2), transparent)',
                                                    backgroundSize: '200% 200%',
                                                }}
                                                animate={{
                                                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                                                }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Additional Info Section */}
            <section className="py-16 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Visit Our Store
                        </h2>
                        <p className="text-gray-300 text-lg mb-6">
                            Experience our collection in person at our flagship store in Bhagalpur.
                            Our team is ready to help you find the perfect saree.
                        </p>
                        <motion.div
                            className="text-gray-400"
                            whileHover={{ scale: 1.02 }}
                        >
                            <p className="text-sm">Open Daily: 10:00 AM - 8:00 PM</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
