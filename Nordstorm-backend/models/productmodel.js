const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description:{type:String},
    price:{type:Number},
    rating:{type:Number},
    image:{type:String},
    category:{type:String},

});

// Create the model
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
