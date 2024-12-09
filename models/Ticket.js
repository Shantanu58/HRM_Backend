const mongoose = require('mongoose');
const mongooseSequence = require("mongoose-sequence")(mongoose);

// Define the ticket schema
const ticketSchema = new mongoose.Schema({
  ticket_code: {
    type: Number,
    unique: true, // Ensure the ticket_code is unique
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  employee_name: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attachment: {
    type: String, 
  },
  status: {
    type: String,
    enum: ['open', 'close', 'onhold'],
    default: 'close',
  },
  created_by: {
    type: String,
    enum: ['HRM', 'Manager', 'Admin'],
    default: 'HRM',
  },
  end_date: {
    type: Date,
    default: Date.now,
  },
  created_date: {
    type: Date,
    default: Date.now, // Automatically sets the creation date to now
  },
  updated_date: {
    type: Date,
    default: Date.now, // Automatically sets the update date to now
  }
});

// Apply mongoose-sequence to the ticket_code field
ticketSchema.plugin(mongooseSequence, {
    inc_field: 'ticket_code',  // The field to auto-increment
    start_seq: 803,            // Start sequence at 803 (this will be formatted to 0803)
    step: 1,                   // Increment by 1
    min: 803,                  // Minimum sequence value is 803
    max: 9999,                 // Maximum sequence value is 9999
    formatter: function(seq) { 
      return String(seq).padStart(4, '0');  // Format the sequence to always be 4 digits with leading zeroes
    }
  });

// Create the model
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
