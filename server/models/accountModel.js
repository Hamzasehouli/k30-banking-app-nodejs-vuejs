const mongoose = require("mongoose");

accountSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, required: true },
    iban: { type: String, required: true },
    balance: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Account = new mongoose.model("Account", accountSchema);

module.exports = Account;
