const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Define Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "dosewise", // Cloudinary folder name
        allowedFormats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => file.originalname // Use original filename
    },
});

// Multer Upload
const upload = multer({ storage });

module.exports = { upload, cloudinary };