const service = require('./service')
const { RESOURCE, STATUSCODE } = require('../../constants/index')
const {
  SuccessHandler,
  ErrorHandler,
  upload,
  imageUpload
} = require('../../utils/index')
const cloudinary = require('../../config/cloudinary')
const asyncHandler = require('express-async-handler')

exports.getAllAccessories = asyncHandler(async (req, res, next) => {
  const data = await service.getAll()
  return !data || data.length === STATUSCODE.ZERO
    ? next(new ErrorHandler('No accessories found'))
    : SuccessHandler(res, 'Accessories Data found', data)
})

exports.getOneAccessory = asyncHandler(async (req, res, next) => {
  const data = await service.getById(req.params.id)
  return !data || data.length === STATUSCODE.ZERO
    ? next(new ErrorHandler('No accessory found'))
    : SuccessHandler(res, 'Accessory Found', data)
})

exports.createAccessory = [
  upload.array(RESOURCE.IMAGE),
  asyncHandler(async (req, res, next) => {
    const image = await imageUpload(req.files, [])
    const price = Number(req.body.price)
    const data = await service.create({
      ...req.body,
      price: price,
      image: image
    })
    return SuccessHandler(res, 'Accessory created successfully', data)
  })
]

exports.updateAccessory = [
  upload.array(RESOURCE.IMAGE), 
  asyncHandler(async (req, res, next) => {
    const accessories = await service.getById(req.params.id)
    oldImage = accessories?.image?.map(i => i?.public_id)
    const image = await imageUpload(req.files, oldImage)

    const data = await service.updateById(req.params.id, {
      ...req.body,
      image: image
    })

    return SuccessHandler(res, 'Accessory updated successfully', data)
  })
]

exports.deleteOneAccessory = asyncHandler(async (req, res, next) => {
  const data = await service.deleteById(req.params.id)
  const accessoryImage = data?.image?.map(i => i?.public_id)
  await cloudinary.api.delete_resources(accessoryImage)

  return !data || data.length === STATUSCODE.ZERO
    ? next(new ErrorHandler('Item not found'))
    : SuccessHandler(res, 'Item deleted successfully', data)
})
