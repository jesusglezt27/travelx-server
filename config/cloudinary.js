const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary")

// setup cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET, 
})
//configurar mi storage
const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"travelx",
        allowedFormats:["jpg","png","jpeg","pdf"]
    }
})
//exportamos
module.exports = multer({storage})