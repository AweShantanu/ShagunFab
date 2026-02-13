const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

let upload;

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    console.log('☁️  Cloudinary storage initialized');
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'shagun_fabrics',
            allowedFormats: ['jpeg', 'png', 'jpg', 'mp4', 'mov'],
            resource_type: 'auto',
        },
    });

    upload = multer({ storage });
} else {
    console.log('📂  Local storage fallback initialized (Cloudinary credentials missing)');
    // Local storage fallback
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        },
    });

    function checkFileType(file, cb) {
        const filetypes = /jpg|jpeg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Images only!');
        }
    }

    upload = multer({
        storage,
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);
        },
    });
}

module.exports = { cloudinary, upload };
