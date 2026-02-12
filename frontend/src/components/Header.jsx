import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems } = useCart();
    const { user, logout } = useAuth();

    // ... (rest of the component)

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold text-red-600 tracking-tighter"
                    >
                        Shagun Fabrics
                    </motion.h1>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 items-center">
                    {['Home', 'Shop', 'About', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
                        >
                            {item}
                            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-600 transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                    {user && user.isAdmin && (
                        <Link to="/admin/dashboard" className="text-red-600 font-bold hover:text-red-800 transition">
                            Admin
                        </Link>
                    )}
                </nav>

                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/cart" className="relative text-gray-700 hover:text-red-600 transition">
                        <ShoppingCart className="w-6 h-6" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <button onClick={logout} className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition">
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    ) : (
                        <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition">
                            <User className="w-6 h-6" />
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-white border-t"
                >
                    <ul className="flex flex-col p-4 space-y-4">
                        {['Home', 'Shop', 'About', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="block text-gray-700 hover:text-red-600 font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                        <li className="flex justify-between border-t pt-4">
                            <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-gray-700">
                                <ShoppingCart className="w-5 h-5" /> <span>Cart</span>
                            </Link>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-gray-700">
                                <User className="w-5 h-5" /> <span>Login</span>
                            </Link>
                        </li>
                    </ul>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
