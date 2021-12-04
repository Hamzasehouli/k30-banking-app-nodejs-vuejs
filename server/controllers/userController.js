const User = require("../models/userModel");
exports.getAllUsers = async function (req, res, next) {
  try {
    const users = await User.find();
    req.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log("error");
  }
};
exports.createUser = async function (req, res, next) {
  try {
    const users = await User.find();
    req.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log("error");
  }
};
