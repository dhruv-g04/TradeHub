const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const { addUser, authUser } = require("../controllers/userControllers");
const { addCart, addProduct, addSelllist, removeWishList, removeSellList } = require("../controllers/productControllers");
const Authenticate = require("../middlewares/Authenticate");
const Product = require("../models/product");

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../frontend/public/uploads"),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
}).single("img");

// User routes
router.post('/signup', addUser);
router.post('/login', authUser);

// Product routes
router.post('/product/cart', addCart);
router.post('/product/sell', upload, addProduct);
router.post('/product/selllist', addSelllist);
router.post('/product/remove/wishlist', removeWishList);
router.post('/product/remove/selllist', removeSellList);

// Protected route to fetch user data
router.get("/aboutuser", Authenticate, (req, res) => {
    res.send(req.rootUser);
});

// Logout route
router.get("/logout", (req, res) => {
    res.clearCookie("jwtoken");
    res.status(200).json({ message: 'Logout Successfully' });
});

// Fetch all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        const reversedArray = products.reverse();
        res.json(reversedArray);
    } catch (error) {
        console.log('Error in fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fetch recent products
router.get('/recentproducts', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(10);
        res.json(products);
    } catch (error) {
        console.log('Error in fetching recent products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fetch product by ID
router.get("/product/products_by_id", async (req, res) => {
    try {
        const productId = req.query.id;
        const foundProduct = await Product.findById(productId);
        if (!foundProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({
            success: true,
            data: foundProduct,
        });
    } catch (err) {
        console.log('Error in fetching product by ID:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
