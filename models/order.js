const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 100,
  },

  address: {
    type: String,
    minLength: 0,
    maxLength: 100,
  },
  phone: {
    type: String,
    minLength: 0,
    maxLength: 100,
  },
  tool: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    minLength: 0,
    maxLength: 100000,
  },
  total: {
    type: Number,
    required: true,
    minLength: 0,
    maxLength: 100000000000000,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = {
  Order: mongoose.model("Order", orderSchema),
};
