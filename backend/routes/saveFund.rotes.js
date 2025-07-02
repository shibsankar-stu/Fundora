const express = require('express');
const saveRouter = express.Router();
const { saveFundToUser, getSavedFunds } = require('../controllers/user.controller');
const auth = require('../middleware/isAuth'); // your JWT validator

saveRouter.post('/save-fund', auth, saveFundToUser);
saveRouter.get('/saved-funds', auth, getSavedFunds);

module.exports = saveRouter;
