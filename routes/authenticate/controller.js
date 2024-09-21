const service = require('../users/service')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { sendToken, removeToken } = require('../../middleware/index')
const {
  ErrorHandler,
  SuccessHandler,
  upload,
  imageUpload,
  setPassword
} = require('../../utils/index')
const { RESOURCE, STATUSCODE } = require('../../constants/index')

exports.registerUser = [
  upload.array(RESOURCE.IMAGE),
  asyncHandler(async (req, res, next) => {
    const image = await imageUpload(req.files, [])

    const password = await setPassword(req.body.password)

    const isExist = await service.getByEmail(req.body.email)
    if (isExist) {
      throw new ErrorHandler('Email already exist', STATUSCODE.BAD_REQUEST)
    }

    const data = await service.create({
      ...req.body,
      image: image,
      password: password
    })

    return SuccessHandler(res, 'User created successfully', data)
  })
]

exports.loginUser = [
  asyncHandler(async (req, res, next) => {
    const data = await service.getByEmail(req.body.email)

    if (!data) {
      throw new ErrorHandler('User Data not found')
    }

    if (!(await bcrypt.compare(req.body.password, data?.password))) {
     
      throw new ErrorHandler('Wrong password', STATUSCODE.UNAUTHORIZED);      
    }

    sendToken(res, data, 'User Successfully Login', STATUSCODE.SUCCESS)
  })
]

exports.logoutUser = asyncHandler(async (req, res, next) => {
  return await removeToken(res, 'User Successfully Logout', STATUSCODE.SUCCESS)
})
