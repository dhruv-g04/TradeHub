const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const userRoutes = require("./routes/userroutes");
const cookieParser = require('cookie-parser');
const Product = require("./models/product");

const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/TradeHub';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});
mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
});
mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use('/api', userRoutes);

app.listen(4000, function () {
    console.log("Server started on port 4000");
});