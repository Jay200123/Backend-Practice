const service = require("../service/userService");
const asyncHandler = require("express-async-handler");
const SuccessHandler = require("../utils/successHandler");
const ErrorHandler = require("../utils/errorHandler");
const { default: mongoose } = require("mongoose");
const { uploadImage } = require("../utils/imageUpload");
const upload = require("../utils/multer");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await service.getAll();
  return !data
    ? next(new ErrorHandler("No users found"))
    : SuccessHandler(res, "Users Data found", data);
});

exports.getOneUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler(`Invalid user ID ${id}`);
  }
  const data = await service.getById(req.params.id);
  return !data
    ? next(new ErrorHandler("No users found"))
    : SuccessHandler(res, "User Found", data);
});

exports.createUser = [
  upload.array("image"),
  asyncHandler(async (req, res, next) => {
    const image = await uploadImage(req.files, []);

    const data = service.create(
      {
      ...req.body,
      image: image,
    }
  );
    return SuccessHandler(res, "User created successfully", data);
  }),
];

exports.updateUser = [
  asyncHandler(async (req, res, next) => {
    const data = await service.updateById(req.params.id, {
      ...req.body,
    });

    return SuccessHandler(res, "User update successfully", data);
  }),
];

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const data = await service.deleteById(req.params.id);
  return !data
    ? next(new ErrorHandler("User Id not found"))
    : SuccessHandler(res, "User deleted successfully", data);
});
