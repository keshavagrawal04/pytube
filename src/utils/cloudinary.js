const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_ClOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;
        const response = await cloudinary.uploader.upload(filePath, { resource_type: auto });
        console.log('File uploaded successfully ', response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(filePath);
        return null;
    }
}

module.exports = uploadOnCloudinaryUpload;
