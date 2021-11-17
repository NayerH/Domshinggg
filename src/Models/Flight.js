//jshint esversion:6
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true
  },
  FlightDate: {
    type: Date,
    required: true,
  },
  Cabin: {
    type: String,
    required: true,
    enum: ['Economy','Business','First']
  },
  SeatsAvailable: {
    type: Number,
    required: true
  }
}, { timestamps: true });
mongoose.models = {};
const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
