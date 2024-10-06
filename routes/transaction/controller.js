const service = require('./service')
const item = require('../item/service')
const accessory = require('../accessories/service')
const { STATUSCODE } = require('../../constants/index')
const { ErrorHandler, SuccessHandler } = require('../../utils/index')
const asyncHandler = require('express-async-handler')

exports.getAllTransaction = asyncHandler(async (req, res, next) => {
  const data = await service.getAll()
  return !data || data.length === STATUSCODE.ZERO
    ? next(new ErrorHandler('No transactions found'))
    : SuccessHandler(res, 'Transactions data successfully retrieved', data)
})

exports.getOneTransaction = asyncHandler(async (req, res, next) => {
  const data = await service.getById(req.params.id)
  return !data || data.length === STATUSCODE.ZERO
    ? next(new ErrorHandler('No transaction found'))
    : SuccessHandler(res, 'Transaction found', data)
})

exports.createTransaction = [
  asyncHandler(async (req, res, next) => {
    const newItems = req.body.items?.map(items => {
      return items
    })

    let itemAmount = 0
    for (const items of newItems) {
      const itemData = await item.getById(items.item)
      itemAmount += itemData?.price * items?.quantity
      await item.updateById(items?.item, {
        quantity: itemData?.quantity - items?.quantity
      })
    }

    const newAccessories = req.body.accessories?.map(accessories => {
      return accessories
    })

    let accessoryAmount = 0
    for (const accessories of newAccessories) {
      const accessoryData = await accessory.getById(accessories.accessory)
      accessoryAmount += accessoryData?.price * accessories?.quantity
      await accessory.updateById(accessoryData?._id, {
        quantity: accessoryData?.quantity - accessories?.quantity
      })
    }

    const totalAmount = itemAmount + accessoryAmount;

    const data = await service.create({
      ...req.body,
      items: req.body.items,
      accessories: req.body.accessories,
      amount: totalAmount
    })

    return SuccessHandler(res, 'Transaction created successfully', data)
  })
]
