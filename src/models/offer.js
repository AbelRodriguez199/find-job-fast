const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

module.exports = mongoose.model('offers', OfferSchema);