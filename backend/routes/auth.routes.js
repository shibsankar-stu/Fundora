const express = require("express");
const authRouter = express.Router();
const { loginUser, registerUser, logoutUser } = require("../controllers/auth.controller");

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser )

module.exports = authRouter;
