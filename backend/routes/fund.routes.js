const express = require("express");
const fundRouter = express.Router();
const auth = require("../middleware/isAuth.js");
const { searchFunds, getFundDetails } = require("../controllers/fundController.js");

fundRouter.get("/search", auth, searchFunds);
fundRouter.get("/details/:schemeCode", auth, getFundDetails);

module.exports = fundRouter;
