const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/isAuth.js");
const { getUserProfile, updateProfile } = require("../controllers/user.controller.js");

userRouter.get("/profile", auth, getUserProfile);
userRouter.put("/profile", auth, updateProfile);

module.exports = userRouter;
