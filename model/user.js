const mongoose = require("mongoose");
const { RESOURCE } = require("../constants/index");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(RESOURCE.USERS, userSchema);
