const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('API is running...');
});

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);

// Database Connection
const User = require('./models/User');
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        // Auto-seed admin user
        try {
            const adminExists = await User.findOne({ email: 'anilbhgat006@gmail.com' });
            if (!adminExists) {
                await User.create({
                    name: 'Admin User',
                    email: 'anilbhgat006@gmail.com',
                    password: 'password123',
                    isAdmin: true,
                });
                console.log('✅ Default Admin User Created');
            }
        } catch (error) {
            console.error('Error auto-seeding admin:', error.message);
        }
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
