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
  },
  category: {
    type: String,
    required: true,
    enum: ['Clothing', 'Electronics', 'Books', 'Furniture', 'Others']
  },

  information: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
})

module.exports = mongoose.model(RESOURCE.ITEM, itemSchema)
