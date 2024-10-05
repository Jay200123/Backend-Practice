const mongoose = require('mongoose')
const { RESOURCE } = require('../../constants/index')

const itemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date_purchased: {
    type: Date,
    required: true
  },
  brand_name: {
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
  quantity: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model(RESOURCE.ITEM, itemSchema)
