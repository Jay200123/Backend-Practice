const item = require('./model');

exports.getAll = async () => {
    return await item.find();   
};

exports.getById = async (_id) => { 
    return  await item.findById(_id);   
};

exports.create = async (body) => { 
    return await item.create([body]);       
}

exports.updateById = async (_id, body) => { 
    return await item.findByIdAndUpdate (_id, body, { new: true, runValidators: true }); 
}

exports.deleteById = async (_id) => {   
    return await item.findByIdAndDelete({ _id });
}