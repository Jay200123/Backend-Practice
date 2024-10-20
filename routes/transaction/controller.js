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
    let itemAmount = 0
    if (req.body.items && Array.isArray(req.body.items)) {
      for (const items of req.body.items) {
        const itemData = await item.getById(items?.item_id)

        itemAmount = itemData?.price * items?.quantity
        await item.updateById(itemData?._id, {
          quantity: itemData?.quantity - items?.quantity
        })
      }
    }

    let accessoryAmount = 0
    if (req.body.accessories && Array.isArray(req.body.accessories)) {
      for (const accessories of req.body.accessories) {
        const accessoryData = await accessory.getById(accessories?.accessory_id)

        accessoryAmount += accessoryData?.price * accessories?.quantity
        await accessory.updateById(accessoryData?._id, {
          quantity: accessoryData?.quantity - accessories?.quantity
        })
      }
    }

    const totalAmount = itemAmount + accessoryAmount

    const data = await service.create({
      ...req.body,
      items: req.body.items,
      accessories: req.body.accessories,
      amount: totalAmount
    })

    return SuccessHandler(res, 'Transaction created successfully', data)
  })
]

exports.updateTransaction = [
  asyncHandler(async (req, res, next) => {
    if (req.body.status == 'cancelled') {
      const transactionData = await service.getById(req.params.id)

      if (transactionData.items && Array.isArray(transactionData.items)) {
        for (const items of transactionData.items) {
          const itemData = await item.getById(items?.item_id)

          await item.updateById(itemData?._id, {
            quantity: itemData?.quantity + items?.quantity
          })
        }
      }

      if (
        transactionData.accessories &&
        Array.isArray(transactionData.accessories)
      ) {
        for (const accessories of transactionData.accessories) {
          const accessoryData = await accessory.getById(
            accessories?.accessory_id
          )

          await accessory.updateById(accessoryData?._id, {
            quantity: accessoryData?.quantity + accessories?.quantity
          })
        }
      }

      const cancel = await service.updateById(req.params.id, req.body)
      return SuccessHandler(res, 'Transaction cancelled successfully', cancel)
    }

    const data = await service.updateById(req.params.id, req.body)
    return SuccessHandler(res, 'Transaction updated successfully', data)
  })
]

exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  const data = await service.deleteById(req.params.id)
  return !data || data.length === STATUSCODE.ZERO
    ? next(new ErrorHandler('No transaction found'))
    : SuccessHandler(res, 'Transaction deleted successfully')
})
