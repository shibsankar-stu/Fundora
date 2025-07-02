const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.rotes");
const fundRouter = require("./routes/fund.routes");
const saveRouter = require("./routes/saveFund.rotes");


const app = express();
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/funds", fundRouter);
app.use("/api/save", saveRouter);



const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fundora";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

