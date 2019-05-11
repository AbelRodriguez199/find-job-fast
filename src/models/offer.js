const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');

const OfferSchema = new Schema({
    post: {
      type: String,
      required: [true,'puesto es requerido']
    },
    description: {
      type: String,
      required: [true,'la descripción es requerida']
    },
    requirements: {
      type: [String],
      default: ''
    },
    salary: {
      type: Number,
      default: 0
    },
    endOffer: {
        type: Date,
        default: Date.now
      },
    user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model('offer', OfferSchema);