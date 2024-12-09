const mongoose = require('mongoose');

const payerSchema = new mongoose.Schema({
  payer_name: {
    type: String,
    required: true
  },
  contact_number: {
    type: String,
    required: true
  }
});

const Payer = mongoose.model('Payer', payerSchema);

module.exports = Payer;