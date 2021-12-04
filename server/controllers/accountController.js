const Account = require("../models/accountModel");
exports.getAllAccounts = async function (req, res, next) {
  try {
    const accounts = await User.find();
    req.status(200).json({
      status: "success",
      data: {
        accounts,
      },
    });
  } catch (err) {
    console.log("error");
  }
};
exports.addAccount = async function (req, res, next) {
  try {
    const accounts = await User.find();
    req.status(200).json({
      status: "success",
      data: {
        accounts,
      },
    });
  } catch (err) {
    console.log("error");
  }
};
