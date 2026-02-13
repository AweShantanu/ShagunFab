const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');

router.post('/', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            console.error('Upload Error: No file provided in request');
            return res.status(400).json({ message: 'No file uploaded. Please select an image.' });
        }
        console.log('Upload Success:', req.file.path);
        res.json({ path: req.file.path });
    } catch (error) {
        console.error('Upload Route Error:', error.message);
        res.status(500).json({ message: `Upload failed: ${error.message}` });
    }
});

module.exports = router;
