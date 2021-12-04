const express = require("express");
const cardController = require("../controllers/cardController");

const router = express.Router();

router.route("/").get(cardController.getAllCards).post(cardController.addCard);

module.exports = router;
