const Ticket = require("../../../models/TicketReply");
const mongoose = require("mongoose");

// Get all Ticket Replies, optionally filter by ticketId
async function getticketreply(req, res) {
  try {
    const { ticketId } = req.params;

    let filter = {};

    // If ticketId is provided, filter by ticketId (if valid)
    if (ticketId) {
      if (!mongoose.Types.ObjectId.isValid(ticketId)) {
        return res.status(400).json({
          message: `Invalid ticketId format.`,
          hasError: true
        });
      }
      filter.ticketId = ticketId;
    }

    // Find all ticket replies matching the filter
    const tickets = await Ticket.find(filter);

    if (tickets.length === 0) {
      return res.status(404).json({
        message: `No ticket replies found.`,
        hasError: true
      });
    }

    return res.status(200).json({
      message: "Tickets fetched successfully.",
      replies:tickets,  // This will contain all matched ticket replies
      hasError: false
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({
      message: "Internal server error. Failed to fetch tickets.",
      error: error.message,
      hasError: true
    });
  }
}

module.exports = getticketreply;
