const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, '.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Testing Cloudinary upload...");

cloudinary.uploader
  .upload("https://res.cloudinary.com/demo/image/upload/sample.jpg")
  .then((result) => {
    console.log("✅ Upload Success:", result.secure_url);
  })
  .catch((error) => {
    console.error("❌ Upload Failed:", error.message);
  });