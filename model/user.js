const mongoose = require('mongoose')
const { RESOURCE } = require('../constants/index')

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: [
    {
      public_id: String,
      url: String,
      originalname: String
    }
  ],
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Customer'],
    default: 'Customer'
  }
})

module.exports = mongoose.model(RESOURCE.USERS, userSchema)
