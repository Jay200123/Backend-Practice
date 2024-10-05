const mongoose = require('mongoose')
const { RESOURCE } = require('../../constants/index')

const transactionSchema = new mongoose.Schema({
  date: {
    required: true,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: RESOURCE.USER,
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RESOURCE.ITEM,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],

  accessories: [
    {
      accessory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RESOURCE.ACCESSORIES,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  amount: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model(RESOURCE.TRANSACTION, transactionSchema)
