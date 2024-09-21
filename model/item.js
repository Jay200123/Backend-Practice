const mongoose = require("mongoose");   
const { RESOURCE } = require("../constants/index.js");

const itemSchema = new mongoose.Schema({
    
});

module.exports = mongoose.model(RESOURCE.ITEM, itemSchema);    