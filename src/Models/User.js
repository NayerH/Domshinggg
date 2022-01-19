//jshint esversion:6
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    Name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
    },
    password: {
      type: String,
    },
    reservations: {
      type: [Object],
    },
    passportNo: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    address: {
      type: String,
    },
    code: {
      type: String,
    },
  },
  { timestamps: true }
)
userSchema.set('toJSON', { virtuals: true })
userSchema.set('toObject', { virtuals: true })
mongoose.models = {}
const User = mongoose.model('User', userSchema)
module.exports = User
