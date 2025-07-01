const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");


const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello, World!");
})

const PORT = process.env.PORT || 4000;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fundora";

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
