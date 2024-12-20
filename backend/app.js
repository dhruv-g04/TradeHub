const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRoutes = require("./routes/userroutes");
const cloudinary = require("./cloudinary/cloudinary")

dotenv.config();
// Middleware setup
// CORS configuration
const allowedOrigins = [
    'http://localhost:3000', // Allow local development
    'https://tradehub-nine.vercel.app', // Allow your deployed frontend
];

// CORS options
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions)); // Use CORS with specified options

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
// app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/TradeHub';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Mongoose is connected");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Routes setup
app.use('/api', userRoutes);

// Server startup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
