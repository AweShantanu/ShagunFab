import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Package, ShoppingBag, Upload, X, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showAddModal, setShowAddModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [videoUploading, setVideoUploading] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        fabric: '',
        color: '',
        occasion: '',
        description: '',
        image: '',
        video: '',
        category: 'Saree',
        stock: 10
    });

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [user, navigate]);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/api/products');
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await api.post('/api/upload', formData, config);

            // If path starts with http, it's Cloudinary, use it directly.
            // Otherwise, it's a local filename, prepend / for the proxy/backend link.
            const finalPath = data.path.startsWith('http')
                ? data.path
                : (data.path.startsWith('/') ? data.path : `/${data.path.replace(/\\/g, '/')}`);

            setNewProduct({ ...newProduct, image: finalPath });
            setUploading(false);
        } catch (error) {
            console.error('File upload error', error);
            setUploading(false);
            const message = error.response?.data?.message || 'Image upload failed. Check backend logs.';
            alert(message);
        }
    };

    const handleVideoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setVideoUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await api.post('/api/upload', formData, config);

            const finalPath = data.path.startsWith('http')
                ? data.path
                : (data.path.startsWith('/') ? data.path : `/${data.path.replace(/\\/g, '/')}`);

            setNewProduct({ ...newProduct, video: finalPath });
            setVideoUploading(false);
        } catch (error) {
            console.error('Video upload error', error);
            setVideoUploading(false);
            const message = error.response?.data?.message || 'Video upload failed. Check backend logs.';
            alert(message);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const productData = {
                ...newProduct,
                images: [newProduct.image],
                video: newProduct.video
            };

            await api.post('/api/products', productData, config);
            setShowAddModal(false);
            setNewProduct({
                name: '', price: '', fabric: '', color: '', occasion: '', description: '', image: '', video: '', category: 'Saree', stock: 10
            });
            fetchProducts();
            alert('Product Added Successfully');
        } catch (error) {
            console.error("Error adding product", error);
            alert('Failed to add product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await api.delete(`/api/products/${id}`, config);
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product", error);
                alert('Failed to delete product');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
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
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-8"
                >
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400">Welcome back, {user?.name || 'Admin'}</p>
                    </div>
                    <motion.div
                        className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 px-6 py-3 rounded-2xl"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                            <div>
                                <div className="text-xs text-gray-400">Total Products</div>
                                <div className="text-xl font-bold text-white">{products.length}</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Tabs - Glassmorphism */}
                <div className="flex space-x-4 mb-8">
                    {[
                        { id: 'products', label: 'Products', icon: Package },
                        { id: 'orders', label: 'Orders', icon: ShoppingBag }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === tab.id
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-red-600/30 to-pink-600/30 border border-white/10 rounded-xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative flex items-center gap-2">
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Products Tab */}
                <AnimatePresence mode="wait">
                    {activeTab === 'products' && (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Package className="w-6 h-6 text-red-400" />
                                    Product Management
                                </h2>
                                <motion.button
                                    onClick={() => setShowAddModal(true)}
                                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-red-600/30 font-semibold"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Saree
                                </motion.button>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product, idx) => (
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="group backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-xl relative"
                                    >
                                        {/* Glow Effect */}
                                        <motion.div
                                            className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        />

                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={product.images?.[0] || 'https://via.placeholder.com/300'}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute top-3 right-3 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">
                                                <span className="text-white text-sm font-semibold">₹{product.price}</span>
                                            </div>
                                        </div>

                                        <div className="p-5 relative z-10">
                                            <h3 className="text-white font-bold text-lg mb-2 truncate">{product.name}</h3>
                                            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                                                <span className="backdrop-blur-sm bg-white/5 px-2 py-1 rounded-lg">{product.fabric}</span>
                                                <span className="backdrop-blur-sm bg-white/5 px-2 py-1 rounded-lg">Stock: {product.stock}</span>
                                            </div>

                                            <div className="flex gap-2">
                                                <motion.button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="flex-1 backdrop-blur-sm bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2 border border-red-500/20"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {products.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
                                    >
                                        <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                        <p className="text-gray-400 text-lg">No products found. Add some sarees!</p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <motion.div
                            key="orders"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-12 text-center"
                        >
                            <ShoppingBag className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">Order Management</h2>
                            <p className="text-gray-400">Order management feature coming soon...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Add Product Modal - Premium */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="backdrop-blur-2xl bg-gradient-to-br from-gray-800/95 to-gray-900/95 border border-white/10 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full blur-3xl -z-10" />

                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
                                        <Sparkles className="w-7 h-7 text-red-400" />
                                        Add New Saree
                                    </h2>
                                    <motion.button
                                        onClick={() => setShowAddModal(false)}
                                        className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.button>
                                </div>

                                <form onSubmit={handleAddProduct} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none transition-all"
                                                placeholder="e.g., Banarasi Silk Saree"
                                                value={newProduct.name}
                                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹)</label>
                                            <input
                                                required
                                                type="number"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none transition-all"
                                                placeholder="5000"
                                                value={newProduct.price}
                                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Fabric</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none transition-all"
                                                placeholder="Silk, Georgette, Cotton"
                                                value={newProduct.fabric}
                                                onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none transition-all"
                                                placeholder="Red, Blue, Green"
                                                value={newProduct.color}
                                                onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Occasion</label>
                                            <select
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-all"
                                                value={newProduct.occasion}
                                                onChange={(e) => setNewProduct({ ...newProduct, occasion: e.target.value })}
                                            >
                                                <option value="" className="bg-gray-800">Select Occasion</option>
                                                <option value="Wedding" className="bg-gray-800">Wedding</option>
                                                <option value="Casual" className="bg-gray-800">Casual</option>
                                                <option value="Party" className="bg-gray-800">Party</option>
                                                <option value="Formal" className="bg-gray-800">Formal</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Stock Quantity</label>
                                            <input
                                                required
                                                type="number"
                                                min="0"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none transition-all"
                                                placeholder="10"
                                                value={newProduct.stock}
                                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                        <textarea
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none transition-all h-24 resize-none"
                                            placeholder="Brief description of the saree..."
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Product Image</label>
                                            <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 bg-white/5 hover:border-red-500/50 transition-all cursor-pointer relative overflow-hidden group">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                                />
                                                <div className="flex flex-col items-center justify-center text-center">
                                                    {uploading ? (
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mb-2"
                                                        />
                                                    ) : newProduct.image ? (
                                                        <div className="relative">
                                                            <img src={newProduct.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Upload className="w-6 h-6 text-white" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                    )}
                                                    <span className="text-gray-400 text-sm">
                                                        {uploading ? 'Uploading...' : 'Upload Image'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Product Video (Optional)</label>
                                            <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 bg-white/5 hover:border-red-500/50 transition-all cursor-pointer relative overflow-hidden group">
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={handleVideoChange}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                                />
                                                <div className="flex flex-col items-center justify-center text-center">
                                                    {videoUploading ? (
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mb-2"
                                                        />
                                                    ) : newProduct.video ? (
                                                        <div className="relative">
                                                            <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                                                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                                                            </div>
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Upload className="w-6 h-6 text-white" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                    )}
                                                    <span className="text-gray-400 text-sm">
                                                        {videoUploading ? 'Uploading...' : 'Upload Video'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                                        <motion.button
                                            type="button"
                                            onClick={() => setShowAddModal(false)}
                                            className="px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            disabled={uploading || videoUploading || !newProduct.image}
                                            className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                            whileHover={!uploading && !videoUploading && newProduct.image ? { scale: 1.05 } : {}}
                                            whileTap={!uploading && !videoUploading && newProduct.image ? { scale: 0.95 } : {}}
                                        >
                                            {uploading || videoUploading ? 'Uploading...' : 'Add Product'}
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default Dashboard;
