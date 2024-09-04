const service = require("../service/userService");
const asyncHandler = require("express-async-handler");
const SuccessHandler = require("../utils/successHandler");
const ErrorHandler = require("../utils/errorHandler");
const upload = require("../utils/multer");
const { uploadImage } = require("../utils/imageUpload");
const { RESOURCE } = require("../constants/index.js");
const cloudinary = require("../config/cloudinary.js");
const setPassword = require("../utils/setPassword.js");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await service.getAll();
  return !data
    ? next(new ErrorHandler("No users found"))
    : SuccessHandler(res, "Users Data found", data);
});

exports.getOneUser = asyncHandler(async (req, res, next) => {
  const data = await service.getById(req.params.id);
  return !data
    ? next(new ErrorHandler("No users found"))
    : SuccessHandler(res, "User Found", data);
});

exports.createUser = [
  upload.array(RESOURCE.IMAGE),
  asyncHandler(async (req, res, next) => {
    const image = await uploadImage(req.files, []);
    
    const password = await setPassword(req.body.password);

    const data = await service.create({
      ...req.body,
      image: image,
      password: password,
    });
    
    return SuccessHandler(res, "User created successfully", data);
  }),
];

exports.updateUser = [
  upload.array(RESOURCE.IMAGE),
  asyncHandler(async (req, res, next) => {
    const user = await service.getById(req.params.id);

    const oldImage = user?.image?.map((i) => i?.public_id);

    const image = await uploadImage(req.files, oldImage);
    const data = await service.updateById(req.params.id, {
      ...req.body,
      image: image,
    });

    return SuccessHandler(res, "User update successfully", data);
  }),
];

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await service.getById(req.params.id);

  const userImage = user?.image?.map((i) => i?.public_id);

  const data = await service.deleteById(req.params.id);
  await cloudinary.api.delete_resources(userImage);

  return !data
    ? next(new ErrorHandler("User Id not found"))
    : SuccessHandler(res, "User deleted successfully", data);
});
