const transaction = require('./model')

exports.getAll = async () => {
  return await transaction
    .find()
    .populate('user')
    .populate('items.item_id')
    .populate('accessories.accessory_id')
    .sort({ date: -1 })
    .lean()
    .exec()
}

exports.getById = async _id => {
  return await transaction
    .findById(_id)
    .populate('user')
    .populate('items.item_id')
    .populate('accessories.accessory_id')
}

exports.create = async data => {
  return await transaction.create(data)
}

exports.updateById = async (id, data) => {
  return await transaction.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })
}

exports.deleteById = async id => {
  return await transaction.findByIdAndDelete(id)
}

exports.findByUserId = async id => {
  return await transaction
    .find({ user: id })
    .populate({
      path: 'items.item_id',
      select: 'item_name description price'
    })
    .populate({
      path: 'accessories.accessory_id',
      select: 'accessory_name description price'
    })
    .lean()
    .exec()
}
