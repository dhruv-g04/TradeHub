const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// Register a new user
const addUser = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body;

    // Check if the username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(409).json({ message: "User Already Exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, username, password: hashedPassword });
    const user = await newUser.save();

    // Generate token
    const token = generateToken(user._id);

    // Set cookie and send response
    res
        .status(201) // 201 Created
        .cookie("jwtoken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
            // secure: process.env.NODE_ENV === "production", // Uncomment this in production
        })
        .json({
            _id: user._id,
            name: user.name,
            username: user.username,
            message: "Registration successful",
            token,
        });
});

// Login user
const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid Username or Password" });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie and send response
    res
        .status(200) // 200 OK
        .cookie("jwtoken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
            // secure: process.env.NODE_ENV === "production", // Uncomment this in production
        })
        .json({
            _id: user._id,
            name: user.name,
            username: user.username,
            token,
        });
});

module.exports = { addUser, authUser };
