const service = require("../service/userService");
const asyncHandler = require("express-async-handler");
const { ErrorHandler, SuccessHandler } = require("../utils/index");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await service.getAll();
  return !data
    ? next(new ErrorHandler("No Users Found"))
    : SuccessHandler(res, "Users Data found", data);
});

