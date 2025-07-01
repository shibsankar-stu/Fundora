const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { searchFunds, getFundDetails } = require("../controllers/fund.controller");

router.get("/search", auth, searchFunds);
router.get("/:id", auth, getFundDetails);

module.exports = router;
