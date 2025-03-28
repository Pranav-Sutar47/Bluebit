const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'dosewise', // Folder in Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg']
    }
});

// Multer Upload Middleware (For Multiple Files)

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        //console.log("Uploading file:", file.originalname); // Debugging
        cb(null, true);
    }
});

module.exports = { upload, cloudinary };