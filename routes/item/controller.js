const service = require('./service')
const {
  ErrorHandler,
  SuccessHandler,
  upload,
  imageUpload
} = require('../../utils/index')
const { RESOURCE, STATUSCODE } = require('../../constants/index')
const asyncHandler = require('express-async-handler')
const cloudinary = require('../../config/cloudinary')

exports.getAllItems = asyncHandler(async (req, res, next) => {
  const data = await service.getAll()
  return !data || data.length === STATUSCODE.ZERO
    ? next(new ErrorHandler('No items found'))
    : SuccessHandler(res, 'Items data successfully retrieved', data)
})

exports.getOneItem = asyncHandler(async (req, res, next) => {
  const data = await service.getById(req.params.id)
  return !data || data.length === STATUSCODE.ZERO
    ? next(new ErrorHandler('No item found'))
    : SuccessHandler(res, 'Item found', data)
})

exports.createItem = [
  upload.array(RESOURCE.IMAGE),
  asyncHandler(async (req, res, next) => {
    const image = await imageUpload(req.files, [])
    const price = Number(req.body.price)
    const parsedInfo = JSON.parse(req.body.information)
    
    const data = await service.create({
      ...req.body,
      price: price,
      image: image,
      information: parsedInfo
    })

    return SuccessHandler(res, 'Item created successfully', data)
  })
]

exports.updateItem = [
  upload.array(RESOURCE.IMAGE),
  asyncHandler(async (req, res, next) => {
    const item = await service.getById(req.params.id)
    const oldImage = item?.image?.map(i => i?.public_id)
    const image = await imageUpload(req.files, oldImage)

    const data = await service.updateById(req.params.id, {
      ...req.body,
      image: image
    })

    return SuccessHandler(res, 'Item updated successfully', data)
  })
]

exports.deleteOneItem = asyncHandler(async (req, res, next) => {
  const data = await service.deleteById(req.params.id)
  const itemImage = data?.image?.map(i => i?.public_id)
  await cloudinary.api.delete_resources(itemImage)

  return !data || data.length === STATUSCODE.ZERO
    ? next(new ErrorHandler('Item not found'))
    : SuccessHandler(res, 'Item deleted successfully', data)
})
