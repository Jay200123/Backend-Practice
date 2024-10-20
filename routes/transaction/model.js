const mongoose = require('mongoose')
const { RESOURCE } = require('../../constants/index')

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: RESOURCE.USERS,
    required: true
  },
  items: [
    {
      item_id: {
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
      accessory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RESOURCE.ACCESSORIES,
        required: false
      },
      quantity: {
        type: Number,
        required: false
      }
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  payment: {
    type: String,
    required: true,
    enum: ['CASH', 'CARD', 'UPI']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  }
})

module.exports = mongoose.model(RESOURCE.TRANSACTION, transactionSchema)
