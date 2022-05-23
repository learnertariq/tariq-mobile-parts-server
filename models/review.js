const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 100,
  },

  img: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 1000,
  },
  text: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 1000,
  },
  rating: {
    type: Number,
    required: true,
    minLength: 0,
    maxLength: 6,
  },
});

module.exports = {
  Review: mongoose.model("Review", reviewSchema),
};
