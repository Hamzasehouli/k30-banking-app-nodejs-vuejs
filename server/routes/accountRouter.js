const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router();

router
  .route("/")
  .get(accountController.getAllAccounts)
  .post(accountController.addAccount);

module.exports = router;
