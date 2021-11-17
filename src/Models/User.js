//jshint esversion:6
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });
mongoose.models = {};
const User = mongoose.model('User', userSchema);
module.exports = User;
