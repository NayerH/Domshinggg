//jshint esversion:6
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String
  }
}, { timestamps: true });
userSchema.plugin(passportLocalMongoose);
mongoose.models = {};
const User = mongoose.model('User', userSchema);
module.exports = User;
