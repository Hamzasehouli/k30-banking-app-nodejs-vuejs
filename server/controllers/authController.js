const User = require('../models/userModel');
const handleJwt = require('../handlers/handleJwt');
const jwt = require('jsonwebtoken');

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
    handleJwt.generateToken(res, user, process.env.JWT_EXP);
    // res.status(201).json({
    //   status: 'success',
    //   data: {
    //     user,
    //   },
    // });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async function (req, res, next) {
  try {
    const inputData = {
      email: req.body.email,
      password: req.body.password,
    };
    User.loginHandler(inputData);

    const user = await User.findOne({ email: inputData.email });
    const isPasswordCorrect = await user.checkPassword(inputData.password);
    if (!isPasswordCorrect) throw 'something went wrong';
    handleJwt.generateToken(res, user, process.env.JWT_EXP);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.isLoggedin = async function (req, res, next) {
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
    const user = await User.findById(decoded.id);
    console.log(user); // bar
  });
};

exports.protect = (...roles) => {
  return () => {
    console.log(roles);
  };
};
