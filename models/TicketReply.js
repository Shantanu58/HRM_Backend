const mongoose = require('mongoose');

// Define the schema for the TicketReply model
const TicketReplySchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,  // Using ObjectId if referring to another collection
    ref: 'Ticket',  // Reference to the Ticket collection
    required: true, // Make ticketId required
  },
  description: {
    type: String,
    required: true,  // Description is required
  },
  attachment: {
    type: String,  // Optional field for the attachment URL or filename
    default: null,  // If no attachment is provided, it will be set to null
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Set the default creation date to the current date/time
  },
  updatedAt: {
    type: Date,
    default: Date.now,  // Set the default update date to the current date/time
  },
});

// Middleware to update the updatedAt field when the document is updated
TicketReplySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model from the schema
const TicketReply = mongoose.model('TicketReply', TicketReplySchema);

// Export the model
module.exports = TicketReply;
