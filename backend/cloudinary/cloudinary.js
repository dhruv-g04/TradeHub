const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Load environment variables

// Immediately Invoked Async Function Expression (IIFE)
(async function () {

    // Cloudinary configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_APISECRET
    });

    // Uncomment and use these blocks if needed for your project

    // // Upload an image
    // try {
    //     const uploadResult = await cloudinary.uploader.upload(
    //         'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    //         {
    //             public_id: 'shoes',
    //         }
    //     );
    //     console.log('Upload Result:', uploadResult);
    // } catch (error) {
    //     console.error('Upload Error:', error);
    // }

    // // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    // console.log('Optimized URL:', optimizeUrl);

    // // Transform the image: auto-crop to square aspect ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    // console.log('Auto-Cropped URL:', autoCropUrl);

})();

// Export the configured Cloudinary instance
module.exports = cloudinary;
