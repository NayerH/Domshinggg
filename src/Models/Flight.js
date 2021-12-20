//jshint esversion:6
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  FlightNumber: {
    type: Number,
    required: true,
    unique: true
  },
  From: {
    type: String,
    required: true
  },
  To: {
    type: String,
    required: true
  },
  FlightDate: {
    type: Date,
    required: true
  },
  ArrivalTime: {
    type: Date,
    required: true
  },
  DepartureTime: {
    type: Date,
    required: true
  },
  BusinessNumOfSeats: {
    type: Number,
    required: true
  },
  EconomyNumOfSeats: {
    type: Number,
    required: true
  },
  Baggage: {
    type: Number,
    required: true
  },
  TripDuration: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  SeatsArrBusiness: {
    type: [Boolean],
    required: true
  },
  SeatsArrEconomy: {
    type: [Boolean],
    required: true
  }
}, { timestamps: true });
flightSchema.set('toJSON', { virtuals: true });
flightSchema.set('toObject', { virtuals: true });
mongoose.models = {};
const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
