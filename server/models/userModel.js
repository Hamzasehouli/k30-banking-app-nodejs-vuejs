const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter your firstname"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter your lastname"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      require: [true, "Please enter a valid password"],
    },
    confirmPassword: {
      type: String,
      require: [true, "Please confirm the entered password"],
    },
    pin: {
      type: Number,
      // required: [true, "Please neter a four digits pin number"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please enter your date of birth"],
    },
    citizenship: {
      type: String,
      required: [true, "Please enter your citizenship"],
    },
    dialingCode: {
      type: Number,
      required: [true, "Dialing code is required"],
    },
    mobilePhoneNumber: {
      type: String,
      required: [true, "Please enter your mobile phone number"],
    },
    street: {
      type: String,
      required: [true, "Please enter your street"],
    },
    houseNumber: {
      type: Number,
      required: [true, "Please enter your house number"],
    },
    zip: {
      type: Number,
      required: [true, "Please enter your zip number"],
    },
    city: {
      type: String,
      required: [true, "Please enter the city where you live"],
    },
    country: {
      type: String,
      required: [true, "Please enter the country where you live"],
    },
    accountType: {
      type: String,
      enum: ["private", "business"],
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

const User = new mongoose.model("User", userSchema);

module.exports = User;
