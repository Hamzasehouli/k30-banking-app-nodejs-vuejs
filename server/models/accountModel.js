const mongoose = require("mongoose");

accountSchema = new mongoose.Schema(
  {
    user: { type: mongoose.ObjectId, required: true },
    iban: { type: String, required: true },
    balance: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    bic: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    expiration: {
      type: Date,
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Account = new mongoose.model("Account", accountSchema);

module.exports = Account;
