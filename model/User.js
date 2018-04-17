//Module Dependencies
const mongoose = require("mongoose");
//calling the mongoose schema
const Schema = mongoose.Schema;

//Create Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date: { type: Date, default: Date.now }
});

//Exporting the model User
module.exports = User = mongoose.model("users", userSchema);
