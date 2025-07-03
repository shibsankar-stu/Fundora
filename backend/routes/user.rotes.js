const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/isAuth.js");
const { getUserProfile } = require("../controllers/user.controller.js");

userRouter.get("/profile", auth, getUserProfile);

module.exports = userRouter;
