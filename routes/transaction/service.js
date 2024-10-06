const transaction = require('./model')

exports.getAll = async () => {
  return await transaction
    .find()
    .populate('user')
    .populate('items.item')
    .populate('accessories.accessory')
}

exports.getById = async id => {
  return await transaction
    .findById(id)
    .populate('user')
    .populate('items.item')
    .populate('accessories.accessory')
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
