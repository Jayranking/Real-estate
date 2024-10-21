const mongoose = require("mongoose");

const buySchema = mongoose.Schema({
  estate_name: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  amount: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  phone_no: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  bedroom: {
    type: String,
    required: true,
  },

  sitting_room: {
    type: String,
    required: true,
  },

  kitchen: {
    type: String,
    required: true,
  },

  toilet: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },
});

const Buy = mongoose.model("buy", buySchema);
module.exports = Buy;
