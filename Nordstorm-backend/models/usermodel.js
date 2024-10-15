const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
 name: {type:String,required:true},
  email: {type:String,required:true},
  password: {type:String,required:true}
  // Add other fields as necessary
});

// Create the model
const usermodel = mongoose.model('User', userSchema);

module.exports = usermodel