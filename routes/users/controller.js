const service = require('./service.js')
const asyncHandler = require('express-async-handler')
const { RESOURCE } = require('../../constants/index')
const {
  ErrorHandler,
  SuccessHandler,
  upload,
  imageUpload
} = require('../../utils/index')
const cloudinary = require('../../config/cloudinary')
const {
  sendEmail,
  generateRandomCode,
  setPassword
} = require('../../utils/index')
const transaction = require('../transaction/service')

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await service.getAll()
  return !data
    ? next(new ErrorHandler('No users found'))
    : SuccessHandler(res, 'Users Data found', data)
})

exports.getOneUser = asyncHandler(async (req, res, next) => {
  const data = await service.getById(req.params.id)
  return !data
    ? next(new ErrorHandler('No users found'))
    : SuccessHandler(res, 'User Found', data)
})

exports.updateUser = [
  upload.array(RESOURCE.IMAGE),
  asyncHandler(async (req, res, next) => {
    const user = await service.getById(req.params.id)

    const oldImage = user?.image?.map(i => i?.public_id)

    const image = await imageUpload(req.files, oldImage)
    const data = await service.updateById(req.params.id, {
      ...req.body,
      image: image
    })

    return SuccessHandler(res, 'User update successfully', data)
  })
]

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await service.getById(req.params.id)

  const userImage = user?.image?.map(i => i?.public_id)

  const data = await service.deleteById(req.params.id)
  await cloudinary.api.delete_resources(userImage)

  return !data
    ? next(new ErrorHandler('User Id not found'))
    : SuccessHandler(res, 'User deleted successfully', data)
})

exports.sendEmailOTP = asyncHandler(async (req, res, next) => {
  const user = await service.getByEmail(req.body.email)

  if (
    new Date() - new Date(user?.verificationCode?.createdAt) <
    5 * 60 * 1000
  ) {
    throw new ErrorHandler(
      'Please wait for 5 minutes before requesting another OTP'
    )
  }

  const otp = generateRandomCode()
  await sendEmail(user?.email, otp)

  const data = await service.createVerificationCode(user?._id, otp)

  return SuccessHandler(res, 'OTP sent successfully', data)
})

exports.resetPassword = asyncHandler(async (req, res, next) => {
  if (req.body.newPassword !== req.body.confirmPassword) {
    throw new ErrorHandler('Password does not match')
  }

  const code = await service.getbyOTPCode(req.body.otp)
  if (
    Date.now() - new Date(code.verificationCode.createdAt).getTime() >
    5 * 60 * 1000
  ) {
    code.verificationCode = null
    await code.save()
    throw new ErrorHandler('Verification code has expired')
  }

  const password = await setPassword(req.body.newPassword)
  const data = await service.resetPassword(req.body.otp, password)

  return SuccessHandler(res, 'Password reset successfully', data)
})

exports.getUserOrders = asyncHandler(async (req, res, next) => {
  const data = await transaction.findByUserId(req.params.id)
  return !data
    ? next(new ErrorHandler('No orders found'))
    : SuccessHandler(res, 'Orders found', data)
})
