const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');

router.post('/', upload.single('image'), (req, res) => {
    try {
        res.json({ path: req.file.path });
    } catch (error) {
        res.status(500).json({ message: 'Upload failed' });
    }
});

module.exports = router;
