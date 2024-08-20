const mongoose = require("mongoose");
const { RESOURCE } = require("../constants/index");

const connectDB = async () => {
  try {
    mongoose.set(RESOURCE.STRICT, false);
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
  console.log(
    `Mongoose database cloud connection successfully established with host ${mongoose.connection.host}`
  );
};

module.exports = connectDB;
