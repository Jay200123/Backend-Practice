const service = require("../service/userService");
const asyncHandler = require("express-async-handler");
const SuccessHandler = require("../utils/successHandler");
const { STATUSCODE } = require("../constants/index");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await service.getAll();
  return SuccessHandler(res, "Users Data found", data);
});

exports.getOneUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID"));
  }
  const data = await service.getById(id);
  return !data
    ? next(new ErrorHandler("No users found"))
    : SuccessHandler(res, "User Found", data);
});

exports.createUser = [
  asyncHandler(async (req, res, next) => {
    const data = service.create(req.body);
    return SuccessHandler(res, "User created successfully", data);
  }),
];

exports.updateUser = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid ID"));
    }

    const data = await service.updateById(id, {
      ...req.body,
    });

    return SuccessHandler(res, "User update successfully", data);
  }),
];

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID"));
  }

  const data = await service.deleteById(id);

  return SuccessHandler(res, "User deleted successfully", data);
});
