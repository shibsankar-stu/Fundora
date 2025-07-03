const express = require("express");
const authRouter = express.Router();
const { loginUser, registerUser, logoutUser } = require("../controllers/auth.controller");
const auth = require("../middleware/isAuth");

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser );
authRouter.get("/check-auth", auth, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

module.exports = authRouter;
