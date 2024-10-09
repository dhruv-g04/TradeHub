const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRoutes = require("./routes/userroutes");

dotenv.config();

// Middleware setup
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
app.use(cors());

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
