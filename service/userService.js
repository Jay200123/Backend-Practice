const user = require("../model/user");

exports.getAll = async () => {
  return await user.find();
};

exports.getById = async (_id) => {
  return await user.findById(_id);
};

exports.create = async (body) => {
  return await user.create([body]);
};

exports.updateById = async (_id, body) => {
  return await user.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
  });
};

exports.deleteById = async (id) => {
  return await user.findByIdAndDelete(id);
};
