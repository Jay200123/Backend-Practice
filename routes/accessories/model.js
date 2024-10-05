const mongoose = require('mongoose')
const { RESOURCE } = require('../../constants/index')

const accessoriesSchema = new mongoose.Schema({
  accessory_name: {
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
      originalName: String
    }
  ],
  quantity: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model(RESOURCE.ACCESSORIES, accessoriesSchema)
