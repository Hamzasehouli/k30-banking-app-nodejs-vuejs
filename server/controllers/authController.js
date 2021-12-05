const User = require('../models/userModel');

exports.signup = async function (req, res, next) {
  try {
    const inputData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      street: req.body.street,
      citizenship: req.body.citizenship,
      zip: req.body.zip,
      houseNumber: req.body.houseNumber,
      country: req.body.country,
      city: req.body.city,
      mobilePhoneNumber: req.body.mobilePhoneNumber,
      dialingCode: req.body.dialingCode,
      accountType: req.body.accountType,
      dateOfBirth: req.body.dateOfBirth,
    };
    const user = await User.create(inputData);
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async function (req, res, next) {
  try {
    const inputData = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    const user = await User.findOne({ email: inputData.email });
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to login',
    });
  }
};
