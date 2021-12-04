const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    holder: mongoose.ObjectId,
    active: {
      type: Boolean,
      default: false,
    },
    expiration: {
      type: Date,
      required: true,
    },
    ccv: {
      type: Number,
      required: true,
    },
    iat: {
      type: Date,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
