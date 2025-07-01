const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getUserProfile, updateProfile } = require("../controllers/user.controller");

router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateProfile);

module.exports = router;
