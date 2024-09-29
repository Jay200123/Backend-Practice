const accessory = require("./model");

exports.getAll = async (req, res) => {
  return await accessory.find();
};

exports.getById = async (_id) => {
  return await accessory.findById(_id);
};

exports.create = async (body) => {
  return await accessory.create([body]);
};

exports.updateById = async (_id, body) => {
  return await accessory.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
  });
};

exports.deleteById = async (_id) => {
  return await accessory.findByIdAndDelete({ _id });
};
