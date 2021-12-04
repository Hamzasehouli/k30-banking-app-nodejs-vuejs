const Card = require("../models/cardModel");
exports.getAllCrds = async function (req, res, next) {
  try {
    const cards = await User.find();
    req.status(200).json({
      status: "success",
      data: {
        cards,
      },
    });
  } catch (err) {
    console.log("error");
  }
};
exports.createCard = async function (req, res, next) {
  try {
    const cards = await User.find();
    req.status(200).json({
      status: "success",
      data: {
        cards,
      },
    });
  } catch (err) {
    console.log("error");
  }
};
