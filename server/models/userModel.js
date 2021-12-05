const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const handleJwt = require('../handlers/handleJwt');

const validateNames = function (val) {
  if (val && isNaN(Number(val.trim())) && val.trim() !== '') {
    return true;
  } else {
    return false;
  }
};

const validateEmail = function (val) {
  if (val.trim().includes('@') && val.trim().split('@')[1].includes('.')) {
    return true;
  } else {
    return false;
  }
};

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please enter your firstname'],
      minLength: 3,
    },
    lastname: {
      type: String,
      required: [true, 'Please enter your lastname'],
      minLength: 3,
      // validate: {
      //   validator(val) {
      //     return validateNames(val);
      //   },
      //   message: 'Please enter your lastname',
      // },
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Please enter a valid password'],
      minLength: 8,
      maxLength: 10,
    },
    confirmPassword: {
      type: String,
      require: [true, 'Please confirm the entered password'],
      minLength: 8,
      maxLength: 10,
    },
    pin: {
      type: Number,
      // required: [true, "Please neter a four digits pin number"],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please enter your date of birth'],
    },
    citizenship: {
      type: String,
      required: [true, 'Please enter your citizenship'],
    },
    dialingCode: {
      type: Number,
      required: [true, 'Dialing code is required'],
    },
    mobilePhoneNumber: {
      type: String,
      required: [true, 'Please enter your mobile phone number'],
      unique: true,
    },
    street: {
      type: String,
      required: [true, 'Please enter your street'],
    },
    houseNumber: {
      type: Number,
      required: [true, 'Please enter your house number'],
    },
    zip: {
      type: Number,
      required: [true, 'Please enter your zip number'],
    },
    city: {
      type: String,
      required: [true, 'Please enter the city where you live'],
    },
    country: {
      type: String,
      required: [true, 'Please enter the country where you live'],
    },
    accountType: {
      type: String,
      enum: ['private', 'business'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    account: {
      type: mongoose.ObjectId,
    },
    cards: {
      type: [mongoose.ObjectId],
    },
    active: {
      type: Boolean,
      default: false,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
const sendError = function (next, val) {
  next(`Please enter your ${val}`);
};

const validatePassword = async function (
  next,
  that,
  password,
  confirmPassword
) {
  if (
    password.trim().length < 8 ||
    password.trim().length > 10 ||
    confirmPassword.trim().length < 8 ||
    confirmPassword.trim().length > 10
  ) {
    return next('err');
  } else if (password.trim() !== confirmPassword.trim()) {
    return next('not equal');
  }
  if (that.isModified(that.password)) {
    bcrypt.hash(password, 12, async function (err, hash) {
      if (err) return;

      that.password = hash;
      that.confirmPassword = undefined;

      next();
    });
  }
};

userSchema.pre('save', function (next) {
  console.log((new Date() - this.dateOfBirth) / (1000 * 60 * 60 * 24 * 365));
  !validateNames(this.firstname)
    ? sendError(next, 'firstname')
    : !validateNames(this.lastname)
    ? sendError(next, 'lastname')
    : !validateEmail(this.email)
    ? sendError(next, 'email')
    : this.citizenship.trim() !== 'moroccan'
    ? sendError(
        next,
        'citizenship, you must have a moroccan citizenship to continue'
      )
    : this.country.trim() !== 'morocco'
    ? sendError(
        next,
        'country, you must have a moroccan adresse to use our services'
      )
    : (new Date() - this.dateOfBirth) / (1000 * 60 * 60 * 24 * 365) < 18
    ? sendError(next, 'You must be at least 18 yo to use our services')
    : validatePassword(next, this, this.password, this.confirmPassword);
});

userSchema.statics.loginHandler = function (inputData) {
  const { email, password } = inputData;

  if (
    !email.trim() ||
    !email.trim().includes('@') ||
    !email.trim().split('@')[1].includes('.')
  ) {
    console.log('Please enter a a valid email to login');
    next('Please enter a a valid email to login');
    return;
  }
};

userSchema.methods.checkPassword = async function (password) {
  if (
    !password.trim() ||
    password.trim().length < 8 ||
    password.trim().length > 10
  ) {
    return false;
  }

  return await bcrypt.compare(password, this.password);
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
