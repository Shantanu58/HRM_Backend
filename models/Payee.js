// models/Payee.js
const mongoose = require('mongoose');

const payeeSchema = new mongoose.Schema({
  payee_name: {
    type: String,
    required: true
  },
  contact_number: {
    type: String,
    required: true
  }
});

const Payee = mongoose.model('Payee', payeeSchema);

module.exports = Payee;
