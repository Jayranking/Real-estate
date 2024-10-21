const mongoose = require("mongoose");

const buildSchema = mongoose.Schema({
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

  land_size: {
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

  description: {
    type: String,
    required: true,
  },

  land_img: {
    type: String,
    required: true,
  },

  plan_img: {
    type: String,
    required: true,
  },
});

const Build = mongoose.model("build", buildSchema);
module.exports = Build;
