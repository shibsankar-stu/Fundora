const express = require("express");
const fundRouter = express.Router();
const auth = require("../middleware/isAuth.js");
const { searchFunds, getFundDetails } = require("../controllers/fundController.js");

fundRouter.get("/search", auth, searchFunds);
fundRouter.get("/:id", auth, getFundDetails);

module.exports = fundRouter;
