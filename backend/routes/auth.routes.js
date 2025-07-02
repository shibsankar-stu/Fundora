const express = require("express");
const authRouter = express.Router();
const { loginUser, registerUser } = require("../controllers/auth.controller");

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
