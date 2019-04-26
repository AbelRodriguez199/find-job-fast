const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    title: String,
    description: String,
    requirements: String,
    salary: Number,
    endOffer: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('offers', OfferSchema);