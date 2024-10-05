const user = require("./model");
const { RESOURCE } = require("../../constants/index"); 

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

exports.deleteById = async (_id) => {
  return await user.findByIdAndDelete(_id);
};

exports.getByEmail = async(email)=>{
  return await user.findOne({ email }).select(RESOURCE.PASSWORD);
};

exports.createVerificationCode = async(_id, code)=>{
  return await user.findOneAndUpdate(_id, { verificationCode: { code: code, createdAt: new Date() } }, { new: true });  
 }

 exports.getbyOTPCode = async(otp)=>{ 
  return await user.findOne({ 'verificationCode.code': otp });    
 }

 exports.resetPassword = async(otp, newPassword)=>{
  return await user.findOneAndUpdate((await user.findOne({ 'verificationCode.code': otp }))?._id, { password: newPassword, verificationCode: null }, { new: true, runValidators: true }).select(RESOURCE.PASSWORD);  
 }